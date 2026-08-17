import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/browser';
import type { IScannerControls } from '@zxing/browser';
import { QrScannerAdapter } from './qr-scanner.adapter';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.html',
  styleUrl: './qr-code-scanner.css',
})
export class QrCodeScanner {
  private readonly adapter = inject(QrScannerAdapter);
  private readonly destroyRef = inject(DestroyRef);
  private readonly preview = viewChild.required<HTMLVideoElement>('preview');
  private controls: IScannerControls | null = null;
  private scanSession = 0;

  readonly formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
  ];

  readonly availableDevices = signal<MediaDeviceInfo[]>([]);
  readonly deviceSelected = signal<string>('');
  readonly hasDevices = signal(false);
  readonly hasPermission = signal<boolean | null>(null);
  readonly qrResultString = signal<string | null>(null);
  readonly torchEnabled = signal(false);
  readonly torchAvailable = signal(false);
  readonly tryHarder = signal(false);
  readonly scanning = signal(false);

  constructor() {
    this.destroyRef.onDestroy(() => this.stopScan());
  }

  async startScan(): Promise<void> {
    if (this.scanning()) {
      return;
    }
    const session = ++this.scanSession;
    this.scanning.set(true);
    this.adapter.setDecodeOptions(this.formatsEnabled, this.tryHarder());

    try {
      const devices = await this.adapter.listDevices();
      if (session !== this.scanSession) {
        return;
      }
      this.availableDevices.set(devices);
      this.hasDevices.set(devices.length > 0);

      const deviceId = this.deviceSelected() || devices[0]?.deviceId || undefined;
      if (deviceId && !this.deviceSelected()) {
        this.deviceSelected.set(deviceId);
      }
      const controls = await this.adapter.decodeFromDevice(deviceId, this.preview(), (text) =>
        this.onCodeResult(text),
      );
      if (session !== this.scanSession) {
        controls.stop();
        return;
      }
      this.controls = controls;
      this.hasPermission.set(true);
      this.onTorchCompatible(Boolean(controls.switchTorch));
    } catch {
      if (session !== this.scanSession) {
        return;
      }
      // Typically a camera-permission denial; intentionally swallowed rather than rethrown.
      this.hasPermission.set(false);
      this.scanning.set(false);
      this.onTorchCompatible(false);
    }
  }

  stopScan(): void {
    this.scanSession += 1;
    this.controls?.stop();
    this.controls = null;
    this.scanning.set(false);
    this.torchEnabled.set(false);
    this.onTorchCompatible(false);
  }

  clearResult(): void {
    this.qrResultString.set(null);
  }

  onCodeResult(resultString: string): void {
    this.qrResultString.set(resultString);
  }

  async onDeviceSelectChange(selected: string): Promise<void> {
    if (this.deviceSelected() === selected) {
      return;
    }
    const restart = this.scanning();
    if (restart) {
      this.stopScan();
    }
    this.deviceSelected.set(selected);
    if (restart) {
      await this.startScan();
    }
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable.set(isCompatible);
  }

  toggleTorch(): void {
    if (!this.torchAvailable()) {
      return;
    }
    this.torchEnabled.update((value) => !value);
    this.controls?.switchTorch?.(this.torchEnabled());
  }

  toggleTryHarder(): void {
    this.tryHarder.update((value) => !value);
    this.adapter.setDecodeOptions(this.formatsEnabled, this.tryHarder());
  }
}
