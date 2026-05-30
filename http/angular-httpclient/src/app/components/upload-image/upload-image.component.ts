import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import heic2any from 'heic2any';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {


  frontendImgURL: any;
  frontendFile: File;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // 讀取預覽
  frontendPreview(files: FileList) {
    if (files.length === 0) {
      return;
    }
    this.frontendFile = files[0];
    // 讀取 包含 heic 在內的 圖片格式
    let reader = new FileReader();
    reader = this.getImgURL(this.frontendFile);
    reader.onload = (e) => {
      console.log('getImgURL  e ' + e);
      this.frontendImgURL = reader.result;
      console.log('getImgURL  this.frontendImgURL ' + this.frontendImgURL);
    };
  }

  // 讀取 文件的副檔名
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }
  // 讀取文件
  getImgURL(file: File): FileReader {
    console.log('getImgURL input file' + file);
    const reader = new FileReader();
    // 處理 heic 及 heif
    if (this.getFileExtension(file.name) === 'heic' || this.getFileExtension(file.name) === 'heif') {
      // 轉成 Blob
      heic2any({
        // required: the HEIF blob file
        blob: file,
        // (optional) MIME type of the target file
        // it can be "image/jpeg", "image/png" or "image/gif"
        // defaults to "image/png"
        toType: 'image/jpeg',
        // conversion quality
        // a number ranging from 0 to 1
        quality: 0.5
      }).then((conversionResult) => {
        // 讀取的Blob或File對象 屬性將包含一個數據：URL格式的字符串（base64編碼)
        reader.readAsDataURL(conversionResult as Blob);
      }).catch((e) => {
        console.log('getImgURL ' + e);
      });
    } else {
      // 讀取的Blob或File對象 屬性將包含一個數據：URL格式的字符串（base64編碼)
      reader.readAsDataURL(file);
    }
    return reader;
  }

  uploadImage() {
    const apiURL = 'http://localhost:8080/upload/base64';
    const formData = new FormData();
    formData.append('img', this.frontendImgURL);

    this.http.post(apiURL, formData)
      .pipe(
      ).subscribe(
        res => {
          alert('OK OK');
        },
        error => {
          alert('上傳失敗 ');
        }
      )
  }


}
