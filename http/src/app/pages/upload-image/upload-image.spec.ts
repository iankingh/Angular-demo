import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UploadImage } from './upload-image';

describe('UploadImage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadImage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(UploadImage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the file input and upload button', async () => {
    const fixture = TestBed.createComponent(UploadImage);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="file"]')).toBeTruthy();
    expect(compiled.querySelectorAll('button').length).toBe(2);
  });
});