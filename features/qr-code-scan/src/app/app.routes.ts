import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'qr-code-scanner',
    loadComponent: () => import('./qr-code-scanner/qr-code-scanner').then((m) => m.QrCodeScanner),
  },
  { path: '', redirectTo: 'qr-code-scanner', pathMatch: 'full' },
];