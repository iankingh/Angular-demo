import {
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { formatTime } from './time-format';
import type { Lap } from './lap.model';

const TICK_MS = 10;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly destroyRef = inject(DestroyRef);

  /** Elapsed time in milliseconds. */
  readonly elapsedMs = signal(0);
  /** Whether the timer is currently running. */
  readonly running = signal(false);
  /** Lap times recorded with the Lap button, in chronological order. */
  readonly laps = signal<Lap[]>([]);

  private timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  /** Formatted elapsed time as mm:ss.cs (centiseconds). */
  get display(): string {
    return formatTime(this.elapsedMs());
  }

  /** Laps at 1-based odd positions (1, 3, 5, ...). */
  get oddLaps(): Lap[] {
    return this.laps().filter((lap) => lap.index % 2 === 1);
  }

  /** Laps at 1-based even positions (2, 4, 6, ...). */
  get evenLaps(): Lap[] {
    return this.laps().filter((lap) => lap.index % 2 === 0);
  }

  start(): void {
    if (this.running()) {
      return;
    }
    this.running.set(true);
    this.timer = setInterval(() => {
      this.elapsedMs.update((ms) => ms + TICK_MS);
    }, TICK_MS);
  }

  pause(): void {
    this.running.set(false);
    this.clearTimer();
  }

  /** Stop and reset the timer and laps. */
  reset(): void {
    this.running.set(false);
    this.clearTimer();
    this.elapsedMs.set(0);
    this.laps.set([]);
  }

  /** Record the current elapsed time as a lap. */
  lap(): void {
    if (!this.running()) {
      return;
    }
    const lap: Lap = {
      index: this.laps().length + 1,
      time: this.display,
    };
    this.laps.update((list) => [...list, lap]);
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}