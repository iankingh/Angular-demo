import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ConfigComponent } from './config';

describe('ConfigComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('creates the component', () => {
    const fixture = TestBed.createComponent(ConfigComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('fetches and renders the config', async () => {
    const fixture = TestBed.createComponent(ConfigComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const req = httpMock.expectOne('http://localhost:3000/config');
    req.flush({ heroesUrl: 'api/heroes', textfile: 'assets/textfile.txt' });

    fixture.detectChanges();
    await fixture.whenStable();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('api/heroes');
    expect(text).toContain('assets/textfile.txt');
  });
});