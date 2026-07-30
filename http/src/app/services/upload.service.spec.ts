import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('upload POSTs the base64 image as FormData to the upload endpoint', () => {
    const base64 = 'data:image/png;base64,xxx';
    service.upload(base64).subscribe((res) => expect(res).toEqual({ ok: true }));

    const req = httpMock.expectOne('http://localhost:8080/upload/base64');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeInstanceOf(FormData);
    expect((req.request.body as FormData).get('img')).toBe(base64);
    req.flush({ ok: true });
  });
});