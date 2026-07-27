import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'page-a',
    loadComponent: () => import('./pages/page-a').then((m) => m.PageA),
    title: 'Page A',
    data: { breadcrumb: 'Page A' },
  },
  {
    path: 'page-b',
    loadComponent: () => import('./pages/page-b').then((m) => m.PageB),
    title: 'Page B',
    data: { breadcrumb: 'Page B' },
  },
  { path: '', redirectTo: 'page-a', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-a' },
];
