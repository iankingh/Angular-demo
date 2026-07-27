import {
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

const TICK_MS = 10;
const MS_PER_SECOND = 1000;

export type Lap = {
  index: number;
  time: string;
};

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
    this.destroyRef.onDestroy(() => this.clearTimer());
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

/** Format milliseconds as mm:ss.cs (centiseconds, two digits). */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / MS_PER_SECOND);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % MS_PER_SECOND) / 10);
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}