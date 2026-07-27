import { TestBed } from '@angular/core/testing';
import { PageA } from './page-a';

describe('PageA', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageA],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(PageA);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders its label', async () => {
    const fixture = TestBed.createComponent(PageA);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('page-a works!');
  });
});
