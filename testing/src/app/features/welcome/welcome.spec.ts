import { TestBed } from '@angular/core/testing';
import { Welcome } from './welcome';

describe('Welcome', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Welcome],
    }).compileComponents();
  });

  it('renders the welcome heading', async () => {
    const fixture = TestBed.createComponent(Welcome);
    await fixture.whenStable();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1?.textContent).toContain('Welcome to app!');
  });

  it('renders the Angular tutorial link with a label span', async () => {
    const fixture = TestBed.createComponent(Welcome);
    await fixture.whenStable();
    const link = fixture.nativeElement.querySelector('[href="https://angular.io/tutorial"]');
    expect(link).toBeTruthy();
    expect(link.querySelector('span')?.textContent).toContain('Learn Angular');
  });

  it('increments the count when the button is clicked', async () => {
    const fixture = TestBed.createComponent(Welcome);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Count is 0');

    button.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(button.textContent).toContain('Count is 1');
  });
});