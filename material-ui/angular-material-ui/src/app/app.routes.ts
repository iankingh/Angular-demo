import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'datepicker-min-max',
    loadComponent: () =>
      import('./datepicker-min-max-example').then((m) => m.DatepickerMinMaxExample),
  },
  {
    path: 'icons-and-slider',
    loadComponent: () =>
      import('./icons-and-slider').then((m) => m.IconsAndSlider),
  },
  { path: '', redirectTo: 'datepicker-min-max', pathMatch: 'full' },
];
