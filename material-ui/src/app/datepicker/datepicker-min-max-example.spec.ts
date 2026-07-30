import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DatepickerMinMaxExample } from './datepicker-min-max-example';

describe('DatepickerMinMaxExample', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerMinMaxExample],
      providers: [provideAnimationsAsync()],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(DatepickerMinMaxExample);
    fixture.detectChanges();
    return fixture;
  }

  it('creates the component', () => {
    const fixture = create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('initializes minDate and maxDate inline', () => {
    const fixture = create();
    const { minDate, maxDate } = fixture.componentInstance;
    expect(minDate).toBeInstanceOf(Date);
    expect(maxDate).toBeInstanceOf(Date);
  });

  it('sets minDate 1 day ahead and maxDate 8 days ahead of today', () => {
    const fixture = create();
    const { minDate, maxDate } = fixture.componentInstance;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minMidnight = new Date(minDate);
    minMidnight.setHours(0, 0, 0, 0);
    const maxMidnight = new Date(maxDate);
    maxMidnight.setHours(0, 0, 0, 0);

    const dayMs = 24 * 60 * 60 * 1000;
    expect(Math.round((minMidnight.getTime() - today.getTime()) / dayMs)).toBe(1);
    expect(Math.round((maxMidnight.getTime() - today.getTime()) / dayMs)).toBe(8);
  });

  it('addDays returns a Date n days from today', () => {
    const fixture = create();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = new Date(fixture.componentInstance.addDays(5));
    result.setHours(0, 0, 0, 0);
    const dayMs = 24 * 60 * 60 * 1000;
    expect(Math.round((result.getTime() - today.getTime()) / dayMs)).toBe(5);
  });

  it('renders a datepicker input with the min and max constraints applied', async () => {
    const fixture = create();
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector(
      'input[matinput]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.min).not.toBe('');
    expect(input.max).not.toBe('');
  });

  it('renders the datepicker toggle and picker', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-datepicker-toggle')).toBeTruthy();
    expect(compiled.querySelector('mat-datepicker')).toBeTruthy();
  });
});