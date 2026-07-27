import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'select-disabled',
    loadComponent: () =>
      import('./select-disabled').then((m) => m.SelectDisabled),
  },
  { path: '', redirectTo: 'select-disabled', pathMatch: 'full' },
];
