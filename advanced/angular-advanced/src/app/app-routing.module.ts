import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFormsModelDrivenFormsComponent } from './feature/hero-form/angular-forms-model-driven-forms/angular-forms-model-driven-forms.component';
import { AngularFormsTemplateDrivenFormsComponent } from './feature/hero-form/angular-forms-template-driven-forms/angular-forms-template-driven-forms.component';
import { HeroFormComponent } from './feature/hero-form/hero-form.component';

const routes: Routes = [

  {
    path: 'forms',
    component: HeroFormComponent,
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
