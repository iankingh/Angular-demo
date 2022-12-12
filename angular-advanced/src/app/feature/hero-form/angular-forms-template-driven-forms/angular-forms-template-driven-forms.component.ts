import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-angular-forms-template-driven-forms',
  templateUrl: './angular-forms-template-driven-forms.component.html',
  styleUrls: ['./angular-forms-template-driven-forms.component.css']
})
export class AngularFormsTemplateDrivenFormsComponent implements OnInit {


  // 性别选项
  public genders = [{
    id: 'male', text: '男', value: true
  }, {
    id: 'female', text: '女', value: false
  }];

  /**
   * 住址下拉
   */
  public locations: Array<string> = ['beijing', 'shanghai', 'hangzhou', 'wuhan'];


  hero: Hero = {
    name: '',  //姓名
    age: 18, // 年紀
    gender: 'male', //性別
    location: '台灣'  //住址
  }

  ngOnInit(): void {
  }

  submit() {
    alert(1111);
  }
}
