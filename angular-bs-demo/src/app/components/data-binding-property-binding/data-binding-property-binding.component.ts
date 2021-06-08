import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding-property-binding',
  templateUrl: './data-binding-property-binding.component.html',
  styleUrls: ['./data-binding-property-binding.component.css']
})
export class DataBindingPropertyBindingComponent implements OnInit {

  itemImageUrl = 'assets/phone.png';
  isUnchanged = true;
  classes = 'special';

  constructor() { }

  ngOnInit(): void {
  }

}
