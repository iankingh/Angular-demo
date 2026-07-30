import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ButtonOverview } from './button-overview';

describe('ButtonOverview', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonOverview],
      providers: [provideAnimationsAsync()],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(ButtonOverview);
    fixture.detectChanges();
    return fixture;
  }

  it('creates the component', () => {
    const fixture = create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a section for every button variant', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const labels = [...compiled.querySelectorAll('.example-label')].map((el) =>
      el.textContent?.trim(),
    );
    expect(labels).toEqual([
      'Basic',
      'Raised',
      'Stroked',
      'Flat',
      'Icon',
      'FAB',
      'Mini FAB',
    ]);
  });

  it('renders the basic variant buttons with the expected colors', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const basicSection = compiled.querySelector('section');
    const buttons = basicSection?.querySelectorAll('button[mat-button]');
    expect(buttons?.length).toBe(5);
    expect(buttons?.[1].getAttribute('color')).toBe('primary');
    expect(buttons?.[2].getAttribute('color')).toBe('accent');
    expect(buttons?.[3].getAttribute('color')).toBe('warn');
    expect(buttons?.[4].hasAttribute('disabled')).toBe(true);
  });

  it('renders the disabled buttons across all variants', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const disabledButtons =
      compiled.querySelectorAll<HTMLElement>('button[disabled]');
    // Basic, Raised, Stroked, Flat, Icon, FAB, Mini FAB each have one disabled button.
    expect(disabledButtons.length).toBe(7);
  });

  it('renders the icon buttons with mat-icon content', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const iconButtons = compiled.querySelectorAll('button[mat-icon-button]');
    expect(iconButtons.length).toBe(5);
    const iconNames = [...compiled.querySelectorAll('mat-icon')].map((el) =>
      el.textContent?.trim(),
    );
    expect(iconNames).toContain('more_vert');
    expect(iconNames).toContain('home');
    expect(iconNames).toContain('favorite');
    expect(iconNames).toContain('open_in_new');
  });

  it('renders FAB and Mini FAB buttons', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('button[mat-fab]').length).toBe(4);
    expect(compiled.querySelectorAll('button[mat-mini-fab]').length).toBe(4);
  });

  it('renders link anchors styled as material buttons', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>('a[mat-button]');
    expect(links.length).toBeGreaterThan(0);
    expect([...links].every((a) => a.getAttribute('href'))).toBe(true);
  });

  it('separates variant sections with mat-divider elements', async () => {
    const fixture = create();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mat-divider').length).toBe(6);
  });
});