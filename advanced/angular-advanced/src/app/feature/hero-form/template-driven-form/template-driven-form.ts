import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Hero, Gender } from '../../../models/hero';
import { HeroValidateDirective } from '../validators/hero-validate.directive';
import { CrossFieldValidateDirective } from '../validators/cross-field-validate.directive';

interface GenderOption {
  id: string;
  text: string;
  value: Gender;
}

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule, NgFor, NgIf, JsonPipe, HeroValidateDirective, CrossFieldValidateDirective],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
})
export class TemplateDrivenForm {
  readonly genders: GenderOption[] = [
    { id: 'male', text: '男', value: 'male' },
    { id: 'female', text: '女', value: 'female' },
  ];

  readonly locations: readonly string[] = ['beijing', 'shanghai', 'hangzhou', 'wuhan'];

  readonly hero: Hero = {
    name: '',
    age: 18,
    gender: 'male',
    location: '台灣',
  };

  submit(value: unknown): void {
    console.warn('template-driven submit', value);
  }
}