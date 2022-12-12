import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFormsModelDrivenFormsComponent } from './hero-form/angular-forms-model-driven-forms/angular-forms-model-driven-forms.component';
import { AngularFormsTemplateDrivenFormsComponent } from './hero-form/angular-forms-template-driven-forms/angular-forms-template-driven-forms.component';


@NgModule({
  declarations: [
    HeroFormComponent,
    AngularFormsTemplateDrivenFormsComponent,
    AngularFormsModelDrivenFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class FeatureModule { }
