import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { heroNameValidator } from '../validators/hero-name.validator';
import { crossFieldValidator } from '../validators/cross-field.validator';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  private readonly fb = inject(FormBuilder);

  readonly profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), heroNameValidator]],
    age: [12, [Validators.required, Validators.min(1), Validators.max(100)]],
    address: this.fb.group({
      province: ['北京市'],
      city: ['北京'],
      district: ['朝阳区'],
      street: ['三里屯街道'],
    }),
  }, { validators: crossFieldValidator });

  get name() {
    return this.profileForm.controls.name;
  }

  submit(): void {
    if (this.profileForm.valid) {
      console.warn('reactive submit', this.profileForm.getRawValue());
    }
  }

  updateProfile(): void {
    this.profileForm.patchValue({ name: '12345' });
  }
}