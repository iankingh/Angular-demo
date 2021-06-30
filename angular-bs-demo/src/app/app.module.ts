import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './components/child/child.component';
import { ParentComponent } from './components/parent/parent.component';
import { DataBindingInterpolationComponent } from './components/data-binding-interpolation/data-binding-interpolation.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DataBindingPropertyBindingComponent } from './components/data-binding-property-binding/data-binding-property-binding.component';
import { DataBindingPropertyTwoWayBindingComponent } from './components/data-binding-property-two-way-binding/data-binding-property-two-way-binding.component';
import { DataBindingPropertyEventBindingComponent } from './components/data-binding-property-event-binding/data-binding-property-event-binding.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    ParentComponent,
    HomeComponent,
    NotFoundComponent,
    DataBindingPropertyBindingComponent,
    DataBindingPropertyTwoWayBindingComponent,
    DataBindingPropertyEventBindingComponent,
    DataBindingInterpolationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
