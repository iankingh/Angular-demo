import { TestBed } from '@angular/core/testing';

import { CustomSelectDemo } from './custom-select-demo';

describe('CustomSelectDemo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectDemo],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(CustomSelectDemo);
    fixture.detectChanges();
    return fixture;
  }

  it('creates the component', () => {
    const fixture = create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes three options and defaults favorite to BB', () => {
    const fixture = create();
    expect(fixture.componentInstance.options.length).toBe(3);
    expect(fixture.componentInstance.favorite).toBe('BB');
  });

  it('renders the hello heading with the Angular Select name', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('app-hello h1');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Hello Angular Select');
  });

  it('renders the custom select and shows the default selected value BB', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-custom-select')).toBeTruthy();
    const selectedParagraph = compiled.querySelector('p');
    expect(selectedParagraph?.textContent).toContain('Selected value: BB');
  });
});