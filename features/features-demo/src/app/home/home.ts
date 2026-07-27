import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DemoLink {
  path: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly demos: DemoLink[] = [
    {
      path: '/data-binding-interpolation',
      label: 'Interpolation',
      description: 'Use {{ expression }} to render component values in the template.',
    },
    {
      path: '/data-binding-property-binding',
      label: 'Property Binding',
      description: 'Bind element properties with [prop]="expr" and bind-prop syntax.',
    },
    {
      path: '/data-binding-event-binding',
      label: 'Event Binding',
      description: 'Listen to DOM events with (event)="handler()" and $event payload.',
    },
    {
      path: '/data-binding-two-way-binding',
      label: 'Two-way Binding',
      description: 'Sync input values with [(ngModel)] and react to user input live.',
    },
    {
      path: '/parent-child',
      label: 'Parent / Child',
      description: 'Pass data down with @Input() and emit events up with @Output().',
    },
  ];
}