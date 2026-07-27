import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-data-binding-property-binding',
  imports: [NgClass],
  templateUrl: './data-binding-property-binding.html',
  styleUrl: './data-binding-property-binding.css',
})
export class DataBindingPropertyBinding {
  protected readonly title = 'Featured product';
  protected readonly itemImageUrl = 'assets/phone.png';
  protected readonly classes = 'special';
}