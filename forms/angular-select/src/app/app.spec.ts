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

  it('renders the hello heading', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const heading = fixture.nativeElement.querySelector('app-hello h1');
    expect(heading.textContent).toContain('Hello Angular Select');
  });

  it('shows the default selected value', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toContain('BB');
  });
});