import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-data-binding-event-binding',
  imports: [],
  templateUrl: './data-binding-event-binding.html',
  styleUrl: './data-binding-event-binding.css',
})
export class DataBindingEventBinding {
  protected readonly count = signal(0);
  protected readonly lastKey = signal<string>('');

  increment(): void {
    this.count.update((value) => value + 1);
  }

  reset(): void {
    this.count.set(0);
  }

  onKeydown(event: KeyboardEvent): void {
    this.lastKey.set(event.key);
  }
}