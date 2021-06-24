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

  timer: any;

  ngOnInit() {}

  start() {
    this.timer = setInterval(() => {
      this.secondTotal++;
      this.second = Math.round(this.secondTotal) / 100;
    }, 10);
  }

  pause() {
    clearInterval(this.timer);
  }

  stop() {
    clearInterval(this.timer);
    this.second = 0;
    this.secondTotal = 0;
  }

  divide() {
    this.totalLapTimes.push(this.second);
    this.oddLapTimes = [];
    this.evenLapTimes = [];

    for (let i = 0; i < this.totalLapTimes.length; i++) {
      if (i % 2 == 0) {
        this.oddLapTimes.push(this.totalLapTimes[i]);
      } else {
        this.evenLapTimes.push(this.totalLapTimes[i]);
      }
    }

    // this.oddLapTimes = this.totalLapTimes.filter();
  }
}
