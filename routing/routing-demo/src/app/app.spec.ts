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

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders navigation links to both feature areas', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const links = fixture.nativeElement.querySelectorAll('header nav a');
    const hrefs = Array.from(links).map((a) => (a as HTMLAnchorElement).getAttribute('href'));
    expect(hrefs).toContain('/breadcrumbs');
    expect(hrefs).toContain('/loading');
  });
});