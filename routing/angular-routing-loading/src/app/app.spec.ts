import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { Subject } from 'rxjs';
import { routes } from './app.routes';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideLocationMocks()],
    }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders navigation links to both pages', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = fixture.nativeElement.querySelectorAll('nav a');
    expect(links.length).toBe(2);
  });

  it('does not show the spinner when idle', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.nativeElement.querySelector('.loading')).toBeNull();
  });
});

describe('App loading spinner', () => {
  let resolverTrigger: Subject<string>;

  beforeEach(async () => {
    resolverTrigger = new Subject<string>();
    const testRoutes: Routes = [
      {
        path: 'b',
        loadComponent: () => import('./page-b/page-b').then((m) => m.PageB),
        resolve: { data: () => resolverTrigger.asObservable() },
      },
      { path: '', redirectTo: 'b', pathMatch: 'full' },
    ];
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(testRoutes), provideLocationMocks()],
    }).compileComponents();
  });

  /** Flushes pending microtasks so router events can fire without waiting for stability. */
  function flushMicrotasks(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }

  it('shows the spinner while the lazy chunk + resolver are pending, then hides it', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const nav = router.navigateByUrl('/b');
    await flushMicrotasks();

    expect(fixture.componentInstance.loading()).toBe(true);
    expect(fixture.nativeElement.querySelector('.loading')).not.toBeNull();

    resolverTrigger.next('');
    resolverTrigger.complete();
    await nav;
    await fixture.whenStable();

    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.nativeElement.querySelector('.loading')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('page-b works!');
  });
});
