import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** @title Select with disabled states */
@Component({
  selector: 'app-select-disabled',
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './select-disabled.html',
  styleUrl: './select-disabled.css',
})
export class SelectDisabled {
  /** Toggles whether the selects below are disabled. */
  readonly disableSelect = new FormControl(false);
}