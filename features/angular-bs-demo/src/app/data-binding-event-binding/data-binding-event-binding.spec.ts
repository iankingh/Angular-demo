import { TestBed } from '@angular/core/testing';
import { DataBindingEventBinding } from './data-binding-event-binding';

describe('DataBindingEventBinding', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBindingEventBinding],
    }).compileComponents();
  });

  it('should create with count 0', () => {
    const fixture = TestBed.createComponent(DataBindingEventBinding);
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance['count']()).toBe(0);
  });

  it('should increment the count when the button is clicked', async () => {
    const fixture = TestBed.createComponent(DataBindingEventBinding);
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector(
      'button.btn-success',
    ) as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(paragraph?.textContent).toContain('1');
  });

  it('should reset the count', async () => {
    const fixture = TestBed.createComponent(DataBindingEventBinding);
    await fixture.whenStable();
    const [incButton, resetButton] = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('button');
    incButton.click();
    incButton.click();
    resetButton.click();
    await fixture.whenStable();
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(paragraph?.textContent).toContain('0');
  });

  it('should capture the last key pressed in the input', async () => {
    const fixture = TestBed.createComponent(DataBindingEventBinding);
    await fixture.whenStable();
    const input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await fixture.whenStable();
    const paragraphs = (fixture.nativeElement as HTMLElement).querySelectorAll('p');
    expect(paragraphs[1].textContent).toContain('Enter');
  });
});