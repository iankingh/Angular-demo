import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import { Config } from '../models/config';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  const mockConfig: Config = { heroesUrl: 'api/heroes', textfile: 'assets/textfile.txt' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('getConfig GETs the config from the API and maps the response', () => {
    service.getConfig().subscribe((data) => expect(data).toEqual(mockConfig));

    const req = httpMock.expectOne('http://localhost:3000/config');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);
  });
});