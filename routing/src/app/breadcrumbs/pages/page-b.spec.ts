import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { PageB } from './page-b';

describe('PageB', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageB],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(PageB);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders its placeholder text', async () => {
    const fixture = TestBed.createComponent(PageB);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('page-b works!');
  });
});