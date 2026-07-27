import { Observable } from 'rxjs';
import { delayResolver, LOAD_DELAY_MS } from './delay.resolver';

describe('delayResolver', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits an empty string after the load delay', () => {
    const emitted: string[] = [];
    (delayResolver({} as any, {} as any) as Observable<string>).subscribe((v: string) =>
      emitted.push(v),
    );

    expect(emitted).toEqual([]);

    vi.advanceTimersByTime(LOAD_DELAY_MS);
    expect(emitted).toEqual(['']);
  });

  it('stays pending before the delay elapses', () => {
    const emitted: string[] = [];
    (delayResolver({} as any, {} as any) as Observable<string>).subscribe((v: string) =>
      emitted.push(v),
    );

    vi.advanceTimersByTime(LOAD_DELAY_MS - 1);
    expect(emitted).toEqual([]);
  });
});
