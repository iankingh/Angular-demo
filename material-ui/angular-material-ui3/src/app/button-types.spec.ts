import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { ButtonTypes } from './button-types';

describe('ButtonTypes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTypes],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(ButtonTypes);
    fixture.detectChanges();
    return fixture;
  }

  it('creates the component', () => {
    const fixture = create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders every button-variant section heading', async () => {
    const fixture = create();
    await fixture.whenStable();
    const headings = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('h3');
    const titles = [...headings].map((h) => h.textContent?.trim());
    expect(titles).toEqual([
      'Basic Buttons',
      'Raised Buttons',
      'Stroked Buttons',
      'Flat Buttons',
      'Icon Buttons',
      'Fab Buttons',
      'Mini Fab Buttons',
    ]);
  });

  it('renders all basic button variants and the disabled one', async () => {
    const fixture = create();
    await fixture.whenStable();
    const rows = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('.example-button-row');
    const basicRow = rows[0];
    expect(basicRow.querySelectorAll('button[mat-button]').length).toBe(6);
    const disabled = basicRow.querySelector(
      'button[mat-button][disabled]',
    ) as HTMLButtonElement;
    expect(disabled).toBeTruthy();
    expect(disabled.disabled).toBe(true);
    expect(basicRow.querySelector('a[mat-button]')).toBeTruthy();
  });

  it('renders raised, stroked, flat, fab and mini-fab variants', async () => {
    const fixture = create();
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('button[mat-raised-button]').length).toBe(6);
    expect(host.querySelectorAll('button[mat-stroked-button]').length).toBe(6);
    expect(host.querySelectorAll('button[mat-flat-button]').length).toBe(6);
    expect(host.querySelectorAll('button[mat-fab]').length).toBe(7);
    expect(host.querySelectorAll('button[mat-mini-fab]').length).toBe(7);
    // each variant also has a routerLink anchor
    expect(host.querySelectorAll('a[mat-raised-button]').length).toBe(1);
    expect(host.querySelectorAll('a[mat-stroked-button]').length).toBe(1);
    expect(host.querySelectorAll('a[mat-flat-button]').length).toBe(1);
    expect(host.querySelectorAll('a[mat-fab]').length).toBe(1);
    expect(host.querySelectorAll('a[mat-mini-fab]').length).toBe(1);
  });

  it('renders the icon-button heart variants', async () => {
    const fixture = create();
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const iconButtons = host.querySelectorAll('button[mat-icon-button]');
    expect(iconButtons.length).toBe(6);
    expect(host.querySelectorAll('mat-icon').length).toBeGreaterThan(5);
  });

  it('keeps the success styling hook on the success buttons', async () => {
    const fixture = create();
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const successButtons = host.querySelectorAll('.success');
    expect(successButtons.length).toBe(7);
  });

  it('navigates via routerLink on the link buttons', async () => {
    const fixture = create();
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const links = host.querySelectorAll('a[mat-button], a[mat-raised-button]');
    expect(links.length).toBeGreaterThan(0);
  });
});
