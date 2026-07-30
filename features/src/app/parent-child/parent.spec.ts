import { TestBed } from '@angular/core/testing';
import { Parent } from './parent';

describe('Parent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Parent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the message in the child', async () => {
    const fixture = TestBed.createComponent(Parent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Hello from parent!');
  });

  it('should increment notifications when the child button is clicked', async () => {
    const fixture = TestBed.createComponent(Parent);
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector(
      'app-child button',
    ) as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Notified by child 1 time(s).');
  });
});