import {Component, OnInit} from '@angular/core';

/** @title Datepicker with min & max validation */
@Component({
  selector: 'datepicker-min-max-example',
  templateUrl: 'datepicker-min-max-example.html',
  styleUrls: ['datepicker-min-max-example.css'],
})
export class DatepickerMinMaxExample  implements OnInit {
  minDate;

  maxDate;

    ngOnInit(): void {
      this.minDate = new Date(this.addDate(1))
      this.maxDate = new Date(this.addDate(8))

  }


    addDate(a): Date{
        var newAddDate = new Date();
        newAddDate.setDate(newAddDate.getDate() + a);
        var time2 = newAddDate.getFullYear()+"-"+(newAddDate.getMonth()+1)+"-"+newAddDate.getDate();
         
        console.log('新增天數 a : ' + a +' 新增日期 : '+ time2)
return newAddDate;
    }


}




/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */