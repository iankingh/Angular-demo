import { Component, isDevMode } from '@angular/core';


import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appName = '圖書清單';
  hints = '請輸入';
  item :any;
  data = [
    {
      id: 1,
      title: 'Spring boot 教學',
      isDone: false

    },
    {
      id: 2,
      title: 'Spring mvc 教學',
      isDone: true

    },

    {
      id: 3,
      title: 'Angular 實戰',
      isDone: false

    },
  ];
  addItem(){
    this.data.push({
      id:4,
      title:this.item,
      isDone:false,
    });
  }

  //
  markDone(id: number) {
    this.data = this.data.map(v => {
      if (v.id === id) {
        v = Object.assign({}, v);
        v.isDone = !v.isDone;
      }
      return v;
    });
  }

  removeItem(id: number) {
    this.data = this.data.filter(v => v.id !== id);
  }

}
