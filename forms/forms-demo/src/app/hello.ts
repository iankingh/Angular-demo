import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `<h1>Hello {{ name }}!</h1>`,
})
export class Hello {
  @Input() name = '';
}