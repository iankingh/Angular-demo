import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../app.routes';
import { PageA } from './page-a';

describe('PageA', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageA],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(PageA);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders its placeholder text', async () => {
    const fixture = TestBed.createComponent(PageA);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('page-a works!');
  });
});