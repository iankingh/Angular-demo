import { TestBed } from '@angular/core/testing';
import { HeroForm } from './hero-form';

describe('HeroForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroForm],
    }).compileComponents();
  });

  it('renders the header', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading?.textContent).toContain('Hero Form');
  });
});