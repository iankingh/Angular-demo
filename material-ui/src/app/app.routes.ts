import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'datepicker', loadComponent: () => import('./datepicker/datepicker-min-max-example').then((m) => m.DatepickerMinMaxExample) },
  { path: 'icons-and-slider', loadComponent: () => import('./icons-and-slider/icons-and-slider').then((m) => m.IconsAndSlider) },
  { path: 'button-overview', loadComponent: () => import('./button-overview/button-overview').then((m) => m.ButtonOverview) },
  { path: 'button-types', loadComponent: () => import('./button-types/button-types').then((m) => m.ButtonTypes) },
  { path: '', redirectTo: 'datepicker', pathMatch: 'full' },
];
