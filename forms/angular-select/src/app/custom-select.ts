import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-custom-select',
  template: `
    <select #select (change)="onChange($event)" (blur)="onTouch()">
      @for (option of options; track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelect),
      multi: true,
    },
  ],
})
export class CustomSelect implements ControlValueAccessor, AfterViewInit {
  @Input() options: SelectOption[] = [];
  @ViewChild('select') private selectRef?: ElementRef<HTMLSelectElement>;

  selected = '';
  private change: (value: string) => void = () => {};
  private touched: () => void = () => {};

  ngAfterViewInit(): void {
    this.syncSelectValue();
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selected = value;
    this.change(value);
  }

  onTouch(): void {
    this.touched();
  }

  writeValue(value: string): void {
    this.selected = value ?? '';
    this.syncSelectValue();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.change = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  setDisabledState(): void {}

  private syncSelectValue(): void {
    const select = this.selectRef?.nativeElement;
    if (select) {
      select.value = this.selected;
    }
  }
}