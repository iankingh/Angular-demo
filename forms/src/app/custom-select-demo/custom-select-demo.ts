import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelect, SelectOption } from '../custom-select';
import { Hello } from '../hello';

@Component({
  selector: 'app-custom-select-demo',
  imports: [FormsModule, CustomSelect, Hello],
  templateUrl: './custom-select-demo.html',
  styleUrl: './custom-select-demo.css',
})
export class CustomSelectDemo {
  readonly options: SelectOption[] = [
    { value: 'AA', label: 'AA' },
    { value: 'BB', label: 'BB' },
    { value: 'CC', label: 'CC' },
  ];

  favorite = 'BB';
}