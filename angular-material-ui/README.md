# AngularMaterialUi
### **Angular** **Material 安裝**

**安裝 Angular Material 指令如下**

```bash
npm install --save @angular/material @angular/cdk

or

ng add @angular/material
```

### **建立 MaterialsUiModule**

```bash
ng g module MaterialsUi --module app
```

### **將元件加入 MaterialsUiModule**

```bash
//要記得手動加入

import { MatSliderModule } from '@angular/material/slider';

…

@NgModule ({....
  imports: [...,
  MatSliderModule,
…],
	exports: [
  MatSliderModule,
  ]
})
```

### **建立 在頁面上加入 元件**

```bash
<mat-slider min="1" max="100" step="1" value="1"></mat-slider>
```

顯示如下圖 你會在頁面上看到這個 Material 滑塊元件。

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/45df9c94-508d-43d4-8204-610d119d3b9f/Untitled.png)

### **mat-flat-button顏色**

[Angular (forked) - StackBlitz](https://stackblitz.com/edit/angular-xzbxx4?file=app%2Fbutton-types-example.html)

### 參考:

[Components | Angular Material](https://material.angular.io/components/categories)

[Essential JS 2 for Angular (syncfusion.com)](https://ej2.syncfusion.com/angular/demos/#/material/uploader/image-preview)

[Angular Material Datepicker Format (concretepage.com)](https://www.concretepage.com/angular-material/angular-material-datepicker-format)

[Angular UI：Angular Material2 | Jonny Huang 的學習筆記 (jonny-huang.github.io)](https://jonny-huang.github.io/angular/training/07_angular_ui-material2/)

[Angular Material - DatePicker. Angular Material 的中文資料真的很少QQ… | by itsems | itsems_frontend | Medium](https://medium.com/itsems-frontend/angular-material-datepicker-72c1a1a09d85)

[[Angular Material完全攻略] Day 01 - 開始 & 簡介 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天 (ithome.com.tw)](https://ithelp.ithome.com.tw/articles/10192187)

[[Angular Material完全攻略] Day 14 - 打造問卷頁面(6) - Checkbox、Radio和Slide Toggle - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天 (ithome.com.tw)](https://ithelp.ithome.com.tw/articles/10195230)
