import { Routes } from '@angular/router';
import { delayResolver } from './loading/delay.resolver';

export const routes: Routes = [
  {
    path: 'breadcrumbs',
    loadComponent: () => import('./breadcrumbs/breadcrumbs-demo').then((m) => m.BreadcrumbsDemo),
    children: [
      {
        path: 'page-a',
        loadComponent: () => import('./breadcrumbs/pages/page-a').then((m) => m.PageA),
        title: 'Page A',
        data: { breadcrumb: 'Page A' },
      },
      {
        path: 'page-b',
        loadComponent: () => import('./breadcrumbs/pages/page-b').then((m) => m.PageB),
        title: 'Page B',
        data: { breadcrumb: 'Page B' },
      },
      { path: '', redirectTo: 'page-a', pathMatch: 'full' },
    ],
  },
  {
    path: 'loading',
    loadComponent: () => import('./loading/loading-demo').then((m) => m.LoadingDemo),
    children: [
      {
        path: 'page-a',
        loadComponent: () => import('./loading/pages/page-a/page-a').then((m) => m.PageA),
        resolve: { data: delayResolver },
      },
      {
        path: 'page-b',
        loadComponent: () => import('./loading/pages/page-b/page-b').then((m) => m.PageB),
        resolve: { data: delayResolver },
      },
      { path: '', redirectTo: 'page-a', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'breadcrumbs', pathMatch: 'full' },
  { path: '**', redirectTo: 'breadcrumbs' },
];
