import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'button-overview',
    loadComponent: () =>
      import('./button-overview').then((m) => m.ButtonOverview),
  },
  { path: '', redirectTo: 'button-overview', pathMatch: 'full' },
];
