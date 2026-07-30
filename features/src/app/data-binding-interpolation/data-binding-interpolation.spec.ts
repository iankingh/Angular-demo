import { TestBed } from '@angular/core/testing';
import { DataBindingInterpolation } from './data-binding-interpolation';

describe('DataBindingInterpolation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBindingInterpolation],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DataBindingInterpolation);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should interpolate the current customer name', async () => {
    const fixture = TestBed.createComponent(DataBindingInterpolation);
    await fixture.whenStable();
    const heading = (fixture.nativeElement as HTMLElement).querySelector('h3');
    expect(heading?.textContent).toContain('Maria');
  });
});