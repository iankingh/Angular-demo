import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFound } from './not-found';

describe('NotFound', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NotFound);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a 404 heading', async () => {
    const fixture = TestBed.createComponent(NotFound);
    await fixture.whenStable();
    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain('404');
  });
});