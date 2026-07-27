import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders navigation links to the demo pages', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = fixture.nativeElement.querySelectorAll('nav a');
    expect(links.length).toBe(4);
  });
});