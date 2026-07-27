import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { App } from './app';

describe('App navigation', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  it('renders Page A after navigating to /page-a', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await router.navigate(['/page-a']);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('page-a works!');
  });

  it('renders Page B after navigating to /page-b', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await router.navigate(['/page-b']);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('page-b works!');
  });

  it('updates the breadcrumb trail when navigating between pages', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    await router.navigate(['/page-a']);
    await fixture.whenStable();
    expect(fixture.componentInstance.crumbs.map((c) => c.label)).toEqual([
      'Home',
      'Page A',
    ]);

    await router.navigate(['/page-b']);
    await fixture.whenStable();
    expect(fixture.componentInstance.crumbs.map((c) => c.label)).toEqual([
      'Home',
      'Page B',
    ]);
  });
});