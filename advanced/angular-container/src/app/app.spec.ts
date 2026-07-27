import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have title "angular-container"', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain('angular-container');
  });

  it('should render the running title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain('angular-container app is running!');
  });

  it('should render the stack note', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const note = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(note?.textContent).toContain('Angular 22');
  });
});
