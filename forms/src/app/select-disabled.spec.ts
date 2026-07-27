import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SelectDisabled } from './select-disabled';

describe('SelectDisabled', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDisabled],
      providers: [provideAnimationsAsync()],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(SelectDisabled);
    fixture.detectChanges();
    return fixture;
  }

  it('creates the component', () => {
    const fixture = create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes a disableSelect control that starts enabled', () => {
    const fixture = create();
    expect(fixture.componentInstance.disableSelect.value).toBe(false);
  });

  it('renders the toggle checkbox and both selects', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-checkbox')).toBeTruthy();
    expect(compiled.querySelector('mat-select')).toBeTruthy();
    expect(compiled.querySelector('select')).toBeTruthy();
  });

  it('keeps the mat-select enabled when disableSelect is false', async () => {
    const fixture = create();
    await fixture.whenStable();
    const matSelect = fixture.nativeElement.querySelector('mat-select');
    expect(matSelect.classList.contains('mat-mdc-select-disabled')).toBe(false);
    expect(matSelect.getAttribute('aria-disabled')).not.toBe('true');
  });

  it('disables both selects when disableSelect is toggled to true', async () => {
    const fixture = create();
    await fixture.whenStable();

    fixture.componentInstance.disableSelect.setValue(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const matSelect = fixture.nativeElement.querySelector('mat-select');
    expect(matSelect.classList.contains('mat-mdc-select-disabled')).toBe(true);
    expect(matSelect.getAttribute('aria-disabled')).toBe('true');

    const nativeSelect = fixture.nativeElement.querySelector(
      'select',
    ) as HTMLSelectElement;
    expect(nativeSelect.disabled).toBe(true);
  });

  it('renders the disabled mat-option (option2) when the panel opens', async () => {
    const fixture = create();
    await fixture.whenStable();

    const trigger = fixture.nativeElement.querySelector(
      '.mat-mdc-select-trigger',
    ) as HTMLElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const options = document.body.querySelectorAll('mat-option');
    expect(options.length).toBe(3);
    const disabledOption = options[1] as HTMLElement;
    expect(disabledOption.getAttribute('disabled')).not.toBeNull();
    expect(disabledOption.textContent).toContain('Option 2 (disabled)');
  });

  it('native select renders the Saab option as disabled', async () => {
    const fixture = create();
    await fixture.whenStable();
    const nativeOptions = fixture.nativeElement.querySelectorAll('select option');
    const saab = [...nativeOptions].find(
      (o: HTMLOptionElement) => o.value === 'saab',
    ) as HTMLOptionElement;
    expect(saab).toBeTruthy();
    expect(saab.disabled).toBe(true);
  });
});
