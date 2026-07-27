import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IconsAndSlider } from './icons-and-slider';

describe('IconsAndSlider', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsAndSlider],
      providers: [provideAnimationsAsync()],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(IconsAndSlider);
    fixture.detectChanges();
    return fixture;
  }

  it('creates the component', () => {
    const fixture = create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes an initialValue of 1', () => {
    const fixture = create();
    expect(fixture.componentInstance.initialValue).toBe(1);
  });

  it('renders a mat-slider and four mat-icons', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-slider')).toBeTruthy();
    const icons = compiled.querySelectorAll('mat-icon');
    expect(icons.length).toBe(4);
  });

  it('applies the primary, accent, and warn colors to the icons', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const primary = compiled.querySelector('mat-icon[color="primary"]');
    const accent = compiled.querySelector('mat-icon[color="accent"]');
    const warn = compiled.querySelector('mat-icon[color="warn"]');
    expect(primary).toBeTruthy();
    expect(accent).toBeTruthy();
    expect(warn).toBeTruthy();
  });
});