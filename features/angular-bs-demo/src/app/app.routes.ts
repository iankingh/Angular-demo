import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'data-binding-interpolation',
    loadComponent: () =>
      import('./data-binding-interpolation/data-binding-interpolation').then(
        (m) => m.DataBindingInterpolation,
      ),
  },
  {
    path: 'data-binding-property-binding',
    loadComponent: () =>
      import('./data-binding-property-binding/data-binding-property-binding').then(
        (m) => m.DataBindingPropertyBinding,
      ),
  },
  {
    path: 'data-binding-event-binding',
    loadComponent: () =>
      import('./data-binding-event-binding/data-binding-event-binding').then(
        (m) => m.DataBindingEventBinding,
      ),
  },
  {
    path: 'data-binding-two-way-binding',
    loadComponent: () =>
      import('./data-binding-two-way-binding/data-binding-two-way-binding').then(
        (m) => m.DataBindingTwoWayBinding,
      ),
  },
  {
    path: 'parent-child',
    loadComponent: () => import('./parent-child/parent').then((m) => m.Parent),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
  },
];
