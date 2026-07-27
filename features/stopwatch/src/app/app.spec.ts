import { TestBed } from '@angular/core/testing';
import { App, formatTime } from './app';

describe('formatTime', () => {
  it('formats zero as 00:00.00', () => {
    expect(formatTime(0)).toBe('00:00.00');
  });

  it('formats seconds with centiseconds', () => {
    expect(formatTime(1_230)).toBe('00:01.23');
  });

  it('rolls over seconds into minutes', () => {
    expect(formatTime(61_000)).toBe('01:01.00');
  });

  it('formats 10 minutes correctly', () => {
    expect(formatTime(600_000)).toBe('10:00.00');
  });
});

describe('App stopwatch', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function createFixture() {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    return { fixture, app };
  }

  it('starts at zero and is not running', async () => {
    const { fixture, app } = createFixture();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(app.elapsedMs()).toBe(0);
    expect(app.running()).toBe(false);
    expect(app.display).toBe('00:00.00');
  });

  it('counts elapsed time after start', async () => {
    const { fixture, app } = createFixture();
    app.start();
    await vi.advanceTimersByTimeAsync(100);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(app.elapsedMs()).toBe(100);
    expect(app.display).toBe('00:00.10');
  });

  it('keeps counting across multiple ticks', async () => {
    const { app } = createFixture();
    app.start();
    await vi.advanceTimersByTimeAsync(1_230);
    expect(app.elapsedMs()).toBe(1_230);
    expect(app.display).toBe('00:01.23');
  });

  it('stops counting on pause and keeps the elapsed value', async () => {
    const { app } = createFixture();
    app.start();
    await vi.advanceTimersByTimeAsync(500);
    app.pause();
    await vi.advanceTimersByTimeAsync(1_000);
    expect(app.running()).toBe(false);
    expect(app.elapsedMs()).toBe(500);
  });

  it('does not start a second timer when start is called twice', async () => {
    const { app } = createFixture();
    app.start();
    const firstTimer = (app as unknown as { timer: unknown }).timer;
    app.start();
    const secondTimer = (app as unknown as { timer: unknown }).timer;
    expect(secondTimer).toBe(firstTimer);
  });

  it('reset clears elapsed time and laps', async () => {
    const { app } = createFixture();
    app.start();
    await vi.advanceTimersByTimeAsync(300);
    app.lap();
    app.reset();
    expect(app.running()).toBe(false);
    expect(app.elapsedMs()).toBe(0);
    expect(app.laps()).toEqual([]);
  });

  it('lap records the current elapsed time and splits odd/even', async () => {
    const { app } = createFixture();
    app.start();
    await vi.advanceTimersByTimeAsync(100);
    app.lap();
    await vi.advanceTimersByTimeAsync(100);
    app.lap();
    await vi.advanceTimersByTimeAsync(100);
    app.lap();

    expect(app.laps().length).toBe(3);
    expect(app.laps()[0].time).toBe('00:00.10');
    expect(app.laps()[1].time).toBe('00:00.20');
    expect(app.laps()[2].time).toBe('00:00.30');

    expect(app.oddLaps.map((l) => l.index)).toEqual([1, 3]);
    expect(app.evenLaps.map((l) => l.index)).toEqual([2]);
  });

  it('lap is ignored when not running', async () => {
    const { app } = createFixture();
    app.lap();
    expect(app.laps()).toEqual([]);
  });

  it('renders the elapsed time in the template', async () => {
    const { fixture, app } = createFixture();
    app.start();
    await vi.advanceTimersByTimeAsync(1_000);
    fixture.detectChanges();
    await fixture.whenStable();
    const display = fixture.nativeElement.querySelector('.display');
    expect(display?.textContent).toContain('00:01.00');
  });

  it('renders lap entries in the all-laps list', async () => {
    const { fixture, app } = createFixture();
    app.start();
    await vi.advanceTimersByTimeAsync(100);
    app.lap();
    await vi.advanceTimersByTimeAsync(100);
    app.lap();
    fixture.detectChanges();
    await fixture.whenStable();

    const items = fixture.nativeElement.querySelectorAll('.laps section:first-child li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Lap 1');
    expect(items[1].textContent).toContain('Lap 2');
  });
});