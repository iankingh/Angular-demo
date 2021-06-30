import { DataBindingPropertyEventBindingComponent } from './components/data-binding-property-event-binding/data-binding-property-event-binding.component';
import { DataBindingPropertyBindingComponent } from './components/data-binding-property-binding/data-binding-property-binding.component';
import { DataBindingInterpolationComponent } from './components/data-binding-interpolation/data-binding-interpolation.component';
import { DataBindingPropertyTwoWayBindingComponent } from './components/data-binding-property-two-way-binding/data-binding-property-two-way-binding.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'data-binding-interpolation', component: DataBindingInterpolationComponent },
  { path: 'data-binding-binding-property-binding', component: DataBindingPropertyBindingComponent },
  { path: 'data-binding-event-binding', component: DataBindingPropertyEventBindingComponent },
  { path: 'data-binding-two-way-binding', component: DataBindingPropertyTwoWayBindingComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
