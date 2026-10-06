import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { BarcodeFormat, type IScannerControls } from '@zxing/browser';
import { QrCodeScanner } from './qr-code-scanner';
import { QrScannerAdapter } from './qr-scanner.adapter';

function makeDevice(id: string, label = id): MediaDeviceInfo {
  return { deviceId: id, label, groupId: 'g', kind: 'videoinput' } as MediaDeviceInfo;
}

function makeControls(): IScannerControls {
  return {
    stop: vi.fn(() => {}),
    switchTorch: vi.fn(() => Promise.resolve()),
  } as unknown as IScannerControls;
}

describe('QrCodeScanner', () => {
  let mockControls: IScannerControls;
  let setDecodeOptions: ReturnType<typeof vi.fn>;

  function configureWithAdapter(adapter: Partial<QrScannerAdapter>) {
    mockControls = makeControls();
    setDecodeOptions = vi.fn();
    return TestBed.configureTestingModule({
      imports: [QrCodeScanner],
      providers: [
        {
          provide: QrScannerAdapter,
          useValue: { setDecodeOptions, ...adapter },
        },
      ],
    }).compileComponents();
  }

  it('creates the component', async () => {
    await configureWithAdapter({ listDevices: vi.fn().mockResolvedValue([]) });
    const fixture = TestBed.createComponent(QrCodeScanner);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the enabled barcode formats', async () => {
    await configureWithAdapter({ listDevices: vi.fn().mockResolvedValue([]) });
    const fixture = TestBed.createComponent(QrCodeScanner);
    const { formatsEnabled } = fixture.componentInstance;
    expect(formatsEnabled.length).toBe(4);
    expect(formatsEnabled).toContain(BarcodeFormat.QR_CODE);
  });

  it('clearResult resets the scanned string', async () => {
    await configureWithAdapter({ listDevices: vi.fn().mockResolvedValue([]) });
    const fixture = TestBed.createComponent(QrCodeScanner);
    const component = fixture.componentInstance;
    component.onCodeResult('hello');
    expect(component.qrResultString()).toBe('hello');
    component.clearResult();
    expect(component.qrResultString()).toBeNull();
  });

  it('toggleTryHarder flips the flag', async () => {
    await configureWithAdapter({ listDevices: vi.fn().mockResolvedValue([]) });
    const fixture = TestBed.createComponent(QrCodeScanner);
    const component = fixture.componentInstance;
    expect(component.tryHarder()).toBe(false);
    component.toggleTryHarder();
    expect(component.tryHarder()).toBe(true);
    expect(setDecodeOptions).toHaveBeenLastCalledWith(component.formatsEnabled, true);
    component.toggleTryHarder();
    expect(component.tryHarder()).toBe(false);
    expect(setDecodeOptions).toHaveBeenLastCalledWith(component.formatsEnabled, false);
  });

  it('toggleTorch is a no-op when torch is unavailable', async () => {
    await configureWithAdapter({ listDevices: vi.fn().mockResolvedValue([]) });
    const fixture = TestBed.createComponent(QrCodeScanner);
    const component = fixture.componentInstance;
    component.toggleTorch();
    expect(component.torchEnabled()).toBe(false);
  });

  it('toggleTorch flips and forwards to controls when torch is available', async () => {
    await configureWithAdapter({ listDevices: vi.fn().mockResolvedValue([]) });
    const fixture = TestBed.createComponent(QrCodeScanner);
    const component = fixture.componentInstance;
    component.onTorchCompatible(true);
    expect(component.torchAvailable()).toBe(true);
    // inject the controls through startScan's adapter path is tested elsewhere;
    // here we drive the switchTorch via a stubbed controls object.
    (component as unknown as { controls: IScannerControls | null }).controls = mockControls;
    component.toggleTorch();
    expect(component.torchEnabled()).toBe(true);
    expect(mockControls.switchTorch).toHaveBeenCalledWith(true);
  });

  it('onDeviceSelectChange updates the selected device and ignores repeats', async () => {
    await configureWithAdapter({ listDevices: vi.fn().mockResolvedValue([]) });
    const fixture = TestBed.createComponent(QrCodeScanner);
    const component = fixture.componentInstance;
    component.onDeviceSelectChange('cam-1');
    expect(component.deviceSelected()).toBe('cam-1');
    component.onDeviceSelectChange('cam-1');
    expect(component.deviceSelected()).toBe('cam-1');
  });

  it('startScan enumerates devices, selects the first and starts decoding', async () => {
    const decodeFromDevice = vi
      .fn()
      .mockImplementation(
        (
          _deviceId: string | undefined,
          _preview: HTMLVideoElement,
          onResult: (t: string) => void,
        ) => {
          onResult('DECODED-123');
          return Promise.resolve(mockControls);
        },
      );
    await configureWithAdapter({
      listDevices: vi
        .fn()
        .mockResolvedValue([makeDevice('cam-1', 'Front'), makeDevice('cam-2', 'Back')]),
      decodeFromDevice,
    });
    const fixture = TestBed.createComponent(QrCodeScanner);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    await component.startScan();
    await fixture.whenStable();

    expect(component.hasDevices()).toBe(true);
    expect(component.hasPermission()).toBe(true);
    expect(component.scanning()).toBe(true);
    expect(component.availableDevices().length).toBe(2);
    expect(component.deviceSelected()).toBe('cam-1');
    expect(component.torchAvailable()).toBe(true);
    expect(setDecodeOptions).toHaveBeenCalledWith(component.formatsEnabled, false);
    expect(decodeFromDevice).toHaveBeenCalledWith(
      'cam-1',
      fixture.nativeElement.querySelector('video'),
      expect.any(Function),
    );
    expect(component.qrResultString()).toBe('DECODED-123');

    component.stopScan();
    expect(mockControls.stop).toHaveBeenCalled();
    expect(component.scanning()).toBe(false);
    expect(component.torchAvailable()).toBe(false);
  });

  it('restarts an active scan when the selected camera changes', async () => {
    const firstControls = makeControls();
    const secondControls = makeControls();
    const decodeFromDevice = vi
      .fn()
      .mockResolvedValueOnce(firstControls)
      .mockResolvedValueOnce(secondControls);
    await configureWithAdapter({
      listDevices: vi.fn().mockResolvedValue([makeDevice('cam-1'), makeDevice('cam-2')]),
      decodeFromDevice,
    });
    const fixture = TestBed.createComponent(QrCodeScanner);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    await component.startScan();

    await component.onDeviceSelectChange('cam-2');

    expect(firstControls.stop).toHaveBeenCalled();
    expect(decodeFromDevice).toHaveBeenLastCalledWith(
      'cam-2',
      expect.anything(),
      expect.any(Function),
    );
    expect(component.deviceSelected()).toBe('cam-2');
    component.stopScan();
  });

  it('startScan is a no-op while already scanning', async () => {
    const decodeFromDevice = vi.fn().mockResolvedValue(mockControls);
    await configureWithAdapter({
      listDevices: vi.fn().mockResolvedValue([makeDevice('cam-1')]),
      decodeFromDevice,
    });
    const fixture = TestBed.createComponent(QrCodeScanner);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    await component.startScan();
    expect(decodeFromDevice).toHaveBeenCalledTimes(1);
    await component.startScan();
    expect(decodeFromDevice).toHaveBeenCalledTimes(1);
    component.stopScan();
  });

  it('startScan records denied permission when enumeration fails', async () => {
    await configureWithAdapter({
      listDevices: vi.fn().mockRejectedValue(new Error('NotAllowed')),
      decodeFromDevice: vi.fn(),
    });
    const fixture = TestBed.createComponent(QrCodeScanner);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    await component.startScan();
    await fixture.whenStable();

    expect(component.hasPermission()).toBe(false);
    expect(component.scanning()).toBe(false);
  });

  it('stops an active camera stream when the component is destroyed', async () => {
    const controls = makeControls();
    await configureWithAdapter({
      listDevices: vi.fn().mockResolvedValue([makeDevice('cam-1')]),
      decodeFromDevice: vi.fn().mockResolvedValue(controls),
    });
    const fixture = TestBed.createComponent(QrCodeScanner);
    fixture.detectChanges();
    await fixture.componentInstance.startScan();

    fixture.destroy();

    expect(controls.stop).toHaveBeenCalled();
  });
});
