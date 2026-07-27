import { TestBed } from '@angular/core/testing';
import { PageB } from './page-b';

describe('PageB', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageB],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(PageB);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders its label', async () => {
    const fixture = TestBed.createComponent(PageB);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('page-b works!');
  });
});
