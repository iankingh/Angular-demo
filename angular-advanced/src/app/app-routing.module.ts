import { AngularFormsModelDrivenFormsComponent } from './components/angular-forms-model-driven-forms/angular-forms-model-driven-forms.component';
import { AngularFormsTemplateDrivenFormsComponent } from './components/angular-forms-template-driven-forms/angular-forms-template-driven-forms.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'forms',
    children: [
      { path: 'template-driven-forms', component: AngularFormsTemplateDrivenFormsComponent },
      { path: 'reactive-forms', component: AngularFormsModelDrivenFormsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
