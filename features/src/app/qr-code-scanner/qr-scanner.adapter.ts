import { Injectable } from '@angular/core';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import { BrowserCodeReader, BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';

/**
 * Thin wrapper around the framework-agnostic @zxing/browser reader so the
 * component stays free of static calls and the camera/Barcode APIs can be
 * mocked in jsdom unit tests.
 */
@Injectable({ providedIn: 'root' })
export class QrScannerAdapter {
  private readonly reader = new BrowserMultiFormatReader();

  setDecodeOptions(formats: BarcodeFormat[], tryHarder: boolean): void {
    const hints = new Map<DecodeHintType, unknown>([[DecodeHintType.POSSIBLE_FORMATS, formats]]);
    if (tryHarder) {
      hints.set(DecodeHintType.TRY_HARDER, true);
    }
    this.reader.setHints(hints);
  }

  listDevices(): Promise<MediaDeviceInfo[]> {
    return BrowserCodeReader.listVideoInputDevices();
  }

  decodeFromDevice(
    deviceId: string | undefined,
    preview: HTMLVideoElement,
    onResult: (text: string) => void,
  ): Promise<IScannerControls> {
    return this.reader.decodeFromVideoDevice(deviceId, preview, (result) => {
      if (result) {
        onResult(result.getText());
      }
    });
  }
}
