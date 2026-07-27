import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UPLOAD_BASE_URL } from '../api-urls';

/**
 * Uploads a base64-encoded image to the demo backend.
 * Extracted from the component so HTTP access lives in a service
 * (single responsibility) and the host URL is centralized.
 */
@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly http = inject(HttpClient);

  /** POST a base64 image string to the demo upload endpoint. */
  upload(base64Image: string): Observable<unknown> {
    const formData = new FormData();
    formData.append('img', base64Image);
    return this.http.post(`${UPLOAD_BASE_URL}/upload/base64`, formData);
  }
}