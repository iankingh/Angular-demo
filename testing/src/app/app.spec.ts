import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates the app shell', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the brand toolbar', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const banner = fixture.nativeElement.querySelector('header[role="banner"]');
    expect(banner?.textContent).toContain('angular-e2e-lab');
  });
});