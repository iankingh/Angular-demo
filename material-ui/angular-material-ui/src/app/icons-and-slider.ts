import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

/** @title Icon colors and a basic slider */
@Component({
  selector: 'app-icons-and-slider',
  imports: [MatIconModule, MatSliderModule],
  templateUrl: './icons-and-slider.html',
  styleUrl: './icons-and-slider.css',
})
export class IconsAndSlider {
  /** Slider starts at 1. */
  readonly initialValue = 1;
}