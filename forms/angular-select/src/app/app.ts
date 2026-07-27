import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelect, SelectOption } from './custom-select';
import { Hello } from './hello';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CustomSelect, Hello],
  template: `
    <app-hello name="Angular Select" />

    <h2>Custom select with two-way ngModel</h2>
    <app-custom-select [options]="options" [(ngModel)]="favorite" />
    <p>Selected value: {{ favorite }}</p>
  `,
  styles: `
    :host {
      font-family: system-ui, sans-serif;
      display: block;
      padding: 1rem;
    }
    h2 {
      margin-top: 1.5rem;
    }
  `,
})
export class App {
  readonly options: SelectOption[] = [
    { value: 'AA', label: 'AA' },
    { value: 'BB', label: 'BB' },
    { value: 'CC', label: 'CC' },
  ];

  favorite = 'BB';
}