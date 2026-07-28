import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  protected readonly host = 'app';
  protected readonly count = signal(0);

  increment(): void {
    this.count.update((value) => value + 1);
  }
}