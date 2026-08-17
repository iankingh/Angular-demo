import { TestBed } from '@angular/core/testing';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  provideRouter,
  Router,
} from '@angular/router';
import type { Event as RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { routes } from '../app.routes';
import { LoadingDemo } from './loading-demo';

describe('LoadingDemo', () => {
  describe('with configured routes', () => {
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

  describe('router event lifecycle', () => {
    let events: Subject<RouterEvent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [provideRouter([])],
      }).compileComponents();
      events = TestBed.inject(Router).events as Subject<RouterEvent>;
    });

    it.each([
      ['cancelled', new NavigationCancel(1, '/cancelled', 'guard rejected')],
      ['failed', new NavigationError(1, '/failed', new Error('resolver failed'))],
      ['skipped', new NavigationSkipped(1, '/skipped', 'same URL')],
    ])('clears loading when navigation is %s', (_label, terminalEvent) => {
      const fixture = TestBed.createComponent(LoadingDemo);

      events.next(new NavigationStart(1, '/target'));
      expect(fixture.componentInstance.loading()).toBe(true);

      events.next(terminalEvent);
      expect(fixture.componentInstance.loading()).toBe(false);
    });

    it('ignores a stale terminal event after a newer navigation starts', () => {
      const fixture = TestBed.createComponent(LoadingDemo);

      events.next(new NavigationStart(1, '/first'));
      events.next(new NavigationStart(2, '/second'));
      events.next(new NavigationCancel(1, '/first', 'superseded'));
      expect(fixture.componentInstance.loading()).toBe(true);

      events.next(new NavigationEnd(2, '/second', '/second'));
      expect(fixture.componentInstance.loading()).toBe(false);
    });
  });
});
