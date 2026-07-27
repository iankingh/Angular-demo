import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding-interpolation',
  imports: [],
  templateUrl: './data-binding-interpolation.html',
  styleUrl: './data-binding-interpolation.css',
})
export class DataBindingInterpolation {
  protected readonly currentCustomer = 'Maria';
  protected readonly title = 'Featured product:';
  protected readonly itemImageUrl = 'assets/potted-plant.png';
}