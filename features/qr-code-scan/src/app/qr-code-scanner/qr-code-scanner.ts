import { Component, inject, signal, viewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/browser';
import { QrScannerAdapter } from './qr-scanner.adapter';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.html',
  styleUrl: './qr-code-scanner.css',
})
export class QrCodeScanner {
  private readonly adapter = inject(QrScannerAdapter);
  private readonly preview = viewChild.required<HTMLVideoElement>('preview');

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

  async startScan(): Promise<void> {
    if (this.scanning()) {
      return;
    }
    try {
      const devices = await this.adapter.listDevices();
      this.availableDevices.set(devices);
      this.hasDevices.set(devices.length > 0);
      this.hasPermission.set(true);
      this.scanning.set(true);

      const deviceId = this.deviceSelected() || devices[0]?.deviceId || undefined;
      this.controls = await this.adapter.decodeFromDevice(
        deviceId,
        this.preview(),
        (text) => this.onCodeResult(text),
      );
    } catch {
      this.hasPermission.set(false);
      this.scanning.set(false);
    }
  }

  stopScan(): void {
    this.controls?.stop();
    this.controls = null;
    this.scanning.set(false);
  }

  clearResult(): void {
    this.qrResultString.set(null);
  }

  onCodeResult(resultString: string): void {
    this.qrResultString.set(resultString);
  }

  onDeviceSelectChange(selected: string): void {
    if (this.deviceSelected() === selected) {
      return;
    }
    this.deviceSelected.set(selected);
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable.set(isCompatible || false);
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
  }

  private controls: import('@zxing/browser').IScannerControls | null = null;
}