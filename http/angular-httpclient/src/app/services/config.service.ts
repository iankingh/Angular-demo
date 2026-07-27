import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../models/config';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly http = inject(HttpClient);

  /** Fetch the demo config from the JSON server. */
  getConfig(): Observable<Config> {
    return this.http.get<Config>('http://localhost:3000/config');
  }
}