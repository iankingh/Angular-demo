import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-loading-demo',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './loading-demo.html',
  styleUrl: './loading-demo.css',
})
export class LoadingDemo {
  /** True while a navigation (lazy chunk + resolver) is in flight. */
  readonly loading = signal(false);

  private readonly router = inject(Router);
  private activeNavigationId: number | null = null;

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeNavigationId = event.id;
        this.loading.set(true);
      } else if (
        (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError ||
          event instanceof NavigationSkipped) &&
        event.id === this.activeNavigationId
      ) {
        this.activeNavigationId = null;
        this.loading.set(false);
      }
    });
  }
}
