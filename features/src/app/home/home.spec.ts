import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Home);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a link for each demo', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('a.btn');
    expect(links.length).toBe(fixture.componentInstance['demos'].length);
  });
});