import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding-interpolation',
  templateUrl: './data-binding-interpolation.component.html',
  styleUrls: ['./data-binding-interpolation.component.css']
})
export class DataBindingInterpolationComponent implements OnInit {


  currentCustomer = 'Maria';

  title = 'Featured product:';
  itemImageUrl = 'assets/potted-plant.png';


  constructor() { }


  ngOnInit(): void {
  }

}
