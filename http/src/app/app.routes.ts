import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create-employee',
    loadComponent: () =>
      import('./pages/employee-create/employee-create').then((m) => m.EmployeeCreate),
  },
  {
    path: 'employees-list',
    loadComponent: () =>
      import('./pages/employee-list/employee-list').then((m) => m.EmployeeList),
  },
  {
    path: 'employee-edit/:id',
    loadComponent: () =>
      import('./pages/employee-edit/employee-edit').then((m) => m.EmployeeEdit),
  },
  {
    path: 'uploadimage',
    loadComponent: () =>
      import('./pages/upload-image/upload-image').then((m) => m.UploadImage),
  },
  {
    path: 'config',
    loadComponent: () => import('./pages/config/config').then((m) => m.ConfigComponent),
  },
  { path: '', redirectTo: 'employees-list', pathMatch: 'full' },
];
