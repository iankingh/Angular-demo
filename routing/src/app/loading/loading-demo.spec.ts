import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../app.routes';
import { LoadingDemo } from './loading-demo';

describe('LoadingDemo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates the component with loading signal initially false', () => {
    const fixture = TestBed.createComponent(LoadingDemo);
    expect(fixture.componentInstance).toBeInstanceOf(LoadingDemo);
    expect(typeof fixture.componentInstance.loading).toBe('function');
    expect(fixture.componentInstance.loading()).toBe(false);
  });

  it('does not render the spinner when loading is false', () => {
    const fixture = TestBed.createComponent(LoadingDemo);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.loading')).toBeNull();
  });

  it('sets loading true on NavigationStart and false on NavigationEnd', async () => {
    const fixture = TestBed.createComponent(LoadingDemo);
    fixture.detectChanges();
    const router = TestBed.inject(Router);

    // Start a navigation whose delayResolver keeps it pending for ~300ms.
    const nav = router.navigateByUrl('/loading/page-a');
    // Yield to a macrotask so the router emits NavigationStart (loading=true)
    // while the resolver delay is still pending.
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(fixture.componentInstance.loading()).toBe(true);

    await nav;
    await fixture.whenStable();
    expect(fixture.componentInstance.loading()).toBe(false);
  });
});
