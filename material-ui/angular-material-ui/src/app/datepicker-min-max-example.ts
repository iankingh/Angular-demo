import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

/** @title Datepicker with min & max validation */
@Component({
  selector: 'app-datepicker-min-max-example',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './datepicker-min-max-example.html',
  styleUrl: './datepicker-min-max-example.css',
})
export class DatepickerMinMaxExample {
  readonly minDate = this.addDays(1);
  readonly maxDate = this.addDays(8);

  /** Returns a Date `days` days from today. */
  addDays(days: number): Date {
    const base = new Date();
    base.setDate(base.getDate() + days);
    return base;
  }
}