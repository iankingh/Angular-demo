import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding-two-way-binding',
  imports: [FormsModule],
  templateUrl: './data-binding-two-way-binding.html',
  styleUrl: './data-binding-two-way-binding.css',
})
export class DataBindingTwoWayBinding {
  protected readonly keyword = signal('');

  reset(): void {
    this.keyword.set('');
  }
}