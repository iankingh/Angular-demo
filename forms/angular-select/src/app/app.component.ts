import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  levelNum: number;
  levels: Array<Object> = [{ num: 0, name: "AA" }, { num: 1, name: "BB" }];

  toNumber() {
    this.levelNum = +this.levelNum;
    console.log(this.levelNum);
  }

  selectedLevel = this.levels[1];

  selectedLevelCustomCompare = { num: 1, name: "BB" };

  compareFn(a, b) {
    console.log(a, b, a && b && a.num == b.num);
    return a && b && a.num == b.num;
  }
}
