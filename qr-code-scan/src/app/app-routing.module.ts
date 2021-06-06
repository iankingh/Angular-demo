import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeScanerComponent } from './qr-code-scaner/qr-code-scaner.component';

const routes: Routes = [


  { path: '', pathMatch: 'full', redirectTo: '/qr-code-scaner' }
,
  { path: 'qr-code-scaner', component: QrCodeScanerComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
