import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('creates the app', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the hero form header', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('Hero Form');
  });
});