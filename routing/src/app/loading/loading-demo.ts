import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';

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

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading.set(true);
      } else if (event instanceof NavigationEnd) {
        this.loading.set(false);
      }
    });
  }
}