import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'forms',
    loadComponent: () => import('./feature/hero-form/hero-form').then((m) => m.HeroForm),
    children: [
      {
        path: 'template-driven-form',
        loadComponent: () =>
          import('./feature/hero-form/template-driven-form/template-driven-form').then(
            (m) => m.TemplateDrivenForm,
          ),
      },
      {
        path: 'reactive-form',
        loadComponent: () =>
          import('./feature/hero-form/reactive-form/reactive-form').then((m) => m.ReactiveForm),
      },
      { path: '', redirectTo: 'template-driven-form', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'forms', pathMatch: 'full' },
];