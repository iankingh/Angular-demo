import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'button-types',
    loadComponent: () =>
      import('./button-types').then((m) => m.ButtonTypes),
  },
  { path: '', redirectTo: 'button-types', pathMatch: 'full' },
];
