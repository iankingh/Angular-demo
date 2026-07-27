import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/** Simulated loading delay (ms) used by the route resolver. */
export const LOAD_DELAY_MS = 300;

/**
 * Functional route resolver that simulates a network/loading delay.
 * Emits an empty string after {@link LOAD_DELAY_MS} milliseconds, keeping
 * the spinner visible while the lazy chunk + resolver are pending.
 */
export const delayResolver: ResolveFn<Observable<string>> = () =>
  of('').pipe(delay(LOAD_DELAY_MS));