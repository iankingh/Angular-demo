import { BreadcrumbService } from './breadcrumb';
import { ActivatedRouteSnapshot } from '@angular/router';

function snapshot(
  segments: { url: string; breadcrumb?: string }[],
): ActivatedRouteSnapshot {
  let root: ActivatedRouteSnapshot | null = null;
  let previous: ActivatedRouteSnapshot | null = null;
  for (const segment of segments) {
    const node = {
      url: segment.url ? [segment.url] : [],
      data: segment.breadcrumb ? { breadcrumb: segment.breadcrumb } : {},
      firstChild: null,
      pathFromRoot: [],
    } as unknown as ActivatedRouteSnapshot;
    if (!root) {
      root = node;
    }
    if (previous) {
      (previous as unknown as { firstChild: ActivatedRouteSnapshot }).firstChild = node;
    }
    previous = node;
  }
  // Build pathFromRoot for each node
  const chain: ActivatedRouteSnapshot[] = [];
  let cursor: ActivatedRouteSnapshot | null = root;
  while (cursor) {
    chain.push(cursor);
    (cursor as unknown as { pathFromRoot: ActivatedRouteSnapshot[] }).pathFromRoot = [...chain];
    cursor = (cursor as unknown as { firstChild: ActivatedRouteSnapshot | null }).firstChild;
  }
  return root!;
}

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;

  beforeEach(() => {
    service = new BreadcrumbService();
  });

  it('always starts with a Home crumb pointing to root', () => {
    const crumbs = service.build(snapshot([]));
    expect(crumbs).toEqual([{ label: 'Home', url: '/' }]);
  });

  it('builds crumbs from route data for a single page', () => {
    const crumbs = service.build(snapshot([{ url: 'page-a', breadcrumb: 'Page A' }]));
    expect(crumbs).toEqual([
      { label: 'Home', url: '/' },
      { label: 'Page A', url: '/page-a' },
    ]);
  });

  it('joins labels with a greater-than separator', () => {
    const crumbs = service.build(snapshot([{ url: 'page-b', breadcrumb: 'Page B' }]));
    expect(service.join(crumbs)).toBe('Home > Page B');
  });
});