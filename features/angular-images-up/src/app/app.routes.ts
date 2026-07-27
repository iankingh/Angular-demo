import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/image-upload/image-upload').then((m) => m.ImageUpload),
  },
];
