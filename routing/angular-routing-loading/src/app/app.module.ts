import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PageAComponent } from './page-a/page-a.component';
import { PageBComponent } from './page-b/page-b.component';
import { DelayResolver } from './delay-resolver';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'a', component: PageAComponent, resolve: {data: DelayResolver } }, 
      { path: 'b', component: PageBComponent, resolve: {data: DelayResolver } }])
  ],
  declarations: [AppComponent, HelloComponent, PageAComponent, PageBComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
