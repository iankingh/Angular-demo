import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  frontendImgURL: any;
  backendImgURL: any;
  frontendFile: File;
  backendFile: File;
  name = 'Angular ' + VERSION.major;

    // 讀取正面預覽
  frontendPreview(files: FileList) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.frontendFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      console.log(reader);
      this.frontendImgURL = reader.result;
    };
  }
}
