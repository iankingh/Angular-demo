import { Component } from '@angular/core';

import { HeroForm } from './hero-form/hero-form';

@Component({
  selector: 'app-root',
  imports: [HeroForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
