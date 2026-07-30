import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { BreadcrumbsDemo } from './breadcrumbs-demo';

describe('BreadcrumbsDemo', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('creates the component', async () => {
    const harness = await RouterTestingHarness.create();
    const demo = await harness.navigateByUrl('/breadcrumbs/page-a', BreadcrumbsDemo);
    expect(demo).toBeInstanceOf(BreadcrumbsDemo);
  });

  it('renders the Home crumb and the page-a breadcrumb label', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/breadcrumbs/page-a', BreadcrumbsDemo);
    const text = harness.routeNativeElement?.textContent ?? '';
    expect(text).toContain('Home');
    expect(text).toContain('Page A');
  });

  it('builds the trail from route data and updates on navigation', async () => {
    const harness = await RouterTestingHarness.create();
    const demoA = await harness.navigateByUrl('/breadcrumbs/page-a', BreadcrumbsDemo);
    expect(demoA.crumbs().map((c) => c.label)).toEqual(['Home', 'Page A']);

    const demoB = await harness.navigateByUrl('/breadcrumbs/page-b', BreadcrumbsDemo);
    expect(demoB.crumbs().map((c) => c.label)).toEqual(['Home', 'Page B']);
  });
});
