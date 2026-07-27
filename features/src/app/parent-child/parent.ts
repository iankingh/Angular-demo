import { Component, signal } from '@angular/core';
import { Child } from './child';

@Component({
  selector: 'app-parent',
  imports: [Child],
  template: `
    <div class="parent">
      <h1>Parent / Child</h1>
      <p>Notified by child <strong>{{ notifications() }}</strong> time(s).</p>
      <app-child [message]="message()" (increment)="onChildNotify()" />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .parent {
        background-color: aqua;
        height: 300px;
        padding: 10px;
      }
    `,
  ],
})
export class Parent {
  protected readonly message = signal('Hello from parent!');
  protected readonly notifications = signal(0);

  onChildNotify(): void {
    this.notifications.update((value) => value + 1);
  }
}