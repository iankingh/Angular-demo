import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../models/config';
import { API_BASE_URL } from '../api-urls';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly http = inject(HttpClient);

  /** Fetch the demo config from the JSON server. */
  getConfig(): Observable<Config> {
    return this.http.get<Config>(`${API_BASE_URL}/config`);
  }
}