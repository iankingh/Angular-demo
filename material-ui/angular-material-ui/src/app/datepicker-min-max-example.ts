import { Component, OnInit } from '@angular/core';
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
export class DatepickerMinMaxExample implements OnInit {
  minDate!: Date;
  maxDate!: Date;

  ngOnInit(): void {
    this.minDate = this.addDate(1);
    this.maxDate = this.addDate(8);
  }

  /** Returns a Date `a` days from today. */
  addDate(a: number): Date {
    const base = new Date();
    base.setDate(base.getDate() + a);
    return base;
  }
}