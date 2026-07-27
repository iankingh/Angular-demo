import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  template: `
    <div class="child">
      <h2>Child</h2>
      <p>Message from parent: <strong>{{ message() }}</strong></p>
      <button type="button" class="btn btn-warning" (click)="increment.emit()">Notify parent</button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .child {
        background-color: bisque;
        width: 80%;
        margin: 0 auto;
        padding: 10px;
      }
    `,
  ],
})
export class Child {
  readonly message = input.required<string>();
  readonly increment = output<void>();
}