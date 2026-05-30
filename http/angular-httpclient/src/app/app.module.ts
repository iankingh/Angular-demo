import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


// Forms module
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// HttpClient module
import { HttpClientModule } from '@angular/common/http';
import { ConfigComponent } from './components/config/config.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    UploadImageComponent,
    ConfigComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    BrowserModule,
    AppRoutingModule ,
    // 於陣列 中加入 FormsModule , 才可以使用NgModel
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
