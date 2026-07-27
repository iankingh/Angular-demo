import { Injectable } from '@angular/core';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import {
  BrowserCodeReader,
  BrowserMultiFormatReader,
  IScannerControls,
} from '@zxing/browser';

/**
 * Thin wrapper around the framework-agnostic @zxing/browser reader so the
 * component stays free of static calls and the camera/Barcode APIs can be
 * mocked in jsdom unit tests.
 */
@Injectable({ providedIn: 'root' })
export class QrScannerAdapter {
  private readonly reader = new BrowserMultiFormatReader(
    new Map([
      [
        DecodeHintType.POSSIBLE_FORMATS,
        [
          BarcodeFormat.QR_CODE,
          BarcodeFormat.CODE_128,
          BarcodeFormat.DATA_MATRIX,
          BarcodeFormat.EAN_13,
        ],
      ],
    ]),
  );

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