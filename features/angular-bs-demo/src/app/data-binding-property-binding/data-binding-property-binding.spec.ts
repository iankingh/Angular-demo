import { TestBed } from '@angular/core/testing';
import { DataBindingPropertyBinding } from './data-binding-property-binding';

describe('DataBindingPropertyBinding', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBindingPropertyBinding],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DataBindingPropertyBinding);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should bind the title and src on the first image', async () => {
    const fixture = TestBed.createComponent(DataBindingPropertyBinding);
    await fixture.whenStable();
    const img = (fixture.nativeElement as HTMLElement).querySelector('img');
    expect(img?.getAttribute('title')).toBe('Featured product');
    expect(img?.getAttribute('src')).toBe('assets/phone.png');
  });

  it('should apply the ngClass value to the paragraph', async () => {
    const fixture = TestBed.createComponent(DataBindingPropertyBinding);
    await fixture.whenStable();
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(paragraph?.classList.contains('special')).toBe(true);
  });
});