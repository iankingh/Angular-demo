import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrCodeScanerComponent } from './qr-code-scaner/qr-code-scaner.component';

@NgModule({
  declarations: [
    AppComponent,
    QrCodeScanerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
