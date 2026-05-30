import { ConfigComponent } from './components/config/config.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

const routes: Routes = [
  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'employees-list', component: EmployeeListComponent },
  { path: 'employee-edit/:id', component: EmployeeEditComponent },
  { path: 'uploadimage', component: UploadImageComponent },
  { path: 'config', component: ConfigComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
