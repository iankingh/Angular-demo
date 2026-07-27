import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CustomSelect, SelectOption } from './custom-select';

describe('CustomSelect', () => {
  const options: SelectOption[] = [
    { value: 'AA', label: 'AA' },
    { value: 'BB', label: 'BB' },
    { value: 'CC', label: 'CC' },
  ];

  async function setup(initialValue = '') {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CustomSelect],
    }).compileComponents();

    const fixture = TestBed.createComponent(CustomSelect);
    fixture.componentInstance.options = options;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentInstance.writeValue(initialValue);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('renders all options from the input', async () => {
    const fixture = await setup();
    const optionEls = fixture.nativeElement.querySelectorAll('option');
    expect(optionEls.length).toBe(3);
    expect(optionEls[1].textContent).toContain('BB');
  });

  it('reflects the written value in the view', async () => {
    const fixture = await setup('CC');
    const selectEl = fixture.nativeElement.querySelector('select');
    expect(selectEl.value).toBe('CC');
  });

  it('writes a value to the model when an option is chosen', async () => {
    const fixture = await setup('AA');
    let captured: string | undefined;
    fixture.componentInstance.registerOnChange((value) => (captured = value));

    const selectEl = fixture.nativeElement.querySelector('select');
    selectEl.value = 'CC';
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(captured).toBe('CC');
    expect(fixture.componentInstance.selected).toBe('CC');
  });

  it('updates the view when the model changes via writeValue', async () => {
    const fixture = await setup('AA');
    fixture.componentInstance.writeValue('BB');
    fixture.detectChanges();
    await fixture.whenStable();

    const selectEl = fixture.nativeElement.querySelector('select');
    expect(selectEl.value).toBe('BB');
  });

  it('marks the control as touched on blur', async () => {
    const fixture = await setup();
    let touched = false;
    fixture.componentInstance.registerOnTouched(() => (touched = true));

    const selectEl = fixture.nativeElement.querySelector('select');
    selectEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(touched).toBe(true);
  });
});