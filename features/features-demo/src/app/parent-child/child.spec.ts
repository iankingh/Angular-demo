import { Component, input, output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Child } from './child';

describe('Child', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Child],
    }).compileComponents();
  });

  it('should render the required input message', async () => {
    const fixture = TestBed.createComponent(Child);
    fixture.componentRef.setInput('message', 'Greetings');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Greetings');
  });

  it('should emit increment when the button is clicked', async () => {
    const fixture = TestBed.createComponent(Child);
    fixture.componentRef.setInput('message', 'Greetings');
    let emitted = 0;
    fixture.componentInstance.increment.subscribe(() => emitted++);
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector(
      'button',
    ) as HTMLButtonElement;
    button.click();
    expect(emitted).toBe(1);
  });
});