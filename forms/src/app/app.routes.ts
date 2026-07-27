import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'hero-form', loadComponent: () => import('./hero-form/hero-form').then((m) => m.HeroForm) },
  { path: 'custom-select', loadComponent: () => import('./custom-select-demo/custom-select-demo').then((m) => m.CustomSelectDemo) },
  { path: 'select-disabled', loadComponent: () => import('./select-disabled').then((m) => m.SelectDisabled) },
  { path: '', redirectTo: 'hero-form', pathMatch: 'full' },
];
