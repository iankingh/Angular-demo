import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

/**
 * Builds breadcrumb trails from the activated route snapshot tree.
 * Each route segment may declare a `breadcrumb` label in its `data`.
 * A leading "Home" entry always points to the application root.
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  build(root: ActivatedRouteSnapshot): BreadcrumbItem[] {
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', url: '/' }];

    let current: ActivatedRouteSnapshot | null = root;
    while (current) {
      const label = current.data?.['breadcrumb'];
      if (label) {
        const url = current.pathFromRoot.map((s) => s.url.join('/')).filter(Boolean).join('/');
        crumbs.push({ label, url: `/${url}` });
      }
      current = current.firstChild;
    }

    return crumbs;
  }

  join(crumbs: BreadcrumbItem[]): string {
    return crumbs.map((c) => c.label).join(' > ');
  }
}