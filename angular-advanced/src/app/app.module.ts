import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFormsTemplateDrivenFormsComponent } from './components/angular-forms-template-driven-forms/angular-forms-template-driven-forms.component';
import { AngularFormsModelDrivenFormsComponent } from './components/angular-forms-model-driven-forms/angular-forms-model-driven-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AngularFormsTemplateDrivenFormsComponent,
    AngularFormsModelDrivenFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
