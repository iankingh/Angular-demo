import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  imports: [FormsModule],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.css',
})
export class HeroForm {
  readonly powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  readonly submitted = signal(false);

  onSubmit(): void {
    this.submitted.set(true);
  }

  newHero(): void {
    this.model = new Hero(42, '', '');
  }

  showFormControls(form: NgForm | null): string | null {
    return form?.controls['name']?.value ?? null;
  }
}