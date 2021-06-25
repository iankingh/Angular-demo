import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  second = 0;
  secondTotal = 0;
  totalLapTimes = [];
  oddLapTimes = [];
  evenLapTimes = [];
  pauseFlag = false; // 判斷是否pause
  startFlag = false;

  timer: any;

  ngOnInit() { }

  start() {

    this.startFlag = true;
    if (!this.pauseFlag) {
      this.second = 0;
      this.secondTotal = 0;
      this.totalLapTimes = [];
      this.oddLapTimes = [];
      this.evenLapTimes = [];
    }

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.secondTotal++;
      this.second = Math.round(this.secondTotal) / 10;
    }, 10);

  }

  //暫停
  pause() {
    this.pauseFlag = true;
    this.startFlag = false;
    clearInterval(this.timer);
  }

  //停止
  stop() {
    this.pauseFlag = false;
    this.startFlag = false;
    clearInterval(this.timer);
    this.secondTotal = 0;
  }

  divide() {

    if (this.startFlag) {

      this.totalLapTimes.push(this.second);

      //RXjs 作法
      this.oddLapTimes = this.totalLapTimes.filter((data, index) => data > 0 && index % 2 === 0)
        .map(item => item);
      this.evenLapTimes = this.totalLapTimes.filter((data, index) => data > 0 && index % 2 !== 0)
        .map(item => item);
    }

    // 原本做法
    // this.oddLapTimes = [];
    // this.evenLapTimes = [];
    // for (let i = 0; i < this.totalLapTimes.length; i++) {
    //   if (i % 2 == 0) {
    //     this.oddLapTimes.push(this.totalLapTimes[i]);
    //   } else {
    //     this.evenLapTimes.push(this.totalLapTimes[i]);
    //   }
    // }

  }
}
