import { Routes } from '@angular/router';
import { delayResolver } from './delay.resolver';

export const routes: Routes = [
  {
    path: 'a',
    loadComponent: () => import('./page-a/page-a').then((m) => m.PageA),
    resolve: { data: delayResolver },
  },
  {
    path: 'b',
    loadComponent: () => import('./page-b/page-b').then((m) => m.PageB),
    resolve: { data: delayResolver },
  },
  { path: '', redirectTo: 'a', pathMatch: 'full' },
];
