import { TestBed } from '@angular/core/testing';
import { DataBindingTwoWayBinding } from './data-binding-two-way-binding';

describe('DataBindingTwoWayBinding', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBindingTwoWayBinding],
    }).compileComponents();
  });

  it('should create with an empty keyword', () => {
    const fixture = TestBed.createComponent(DataBindingTwoWayBinding);
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance['keyword']()).toBe('');
  });

  it('should reflect typed input through ngModel', async () => {
    const fixture = TestBed.createComponent(DataBindingTwoWayBinding);
    await fixture.whenStable();
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const pre = (fixture.nativeElement as HTMLElement).querySelector('pre');
    expect(pre?.textContent).toContain('hello');
  });

  it('should clear the keyword on Escape', async () => {
    const fixture = TestBed.createComponent(DataBindingTwoWayBinding);
    await fixture.whenStable();
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    await fixture.whenStable();
    expect(fixture.componentInstance['keyword']()).toBe('');
  });
});