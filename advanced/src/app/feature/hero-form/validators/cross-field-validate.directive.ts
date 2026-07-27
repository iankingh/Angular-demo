import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { crossFieldValidator } from './cross-field.validator';

/** 套用於樣板驅動 `<form #f="ngForm">` 的跨欄位群組驗證指令。 */
@Directive({
  selector: '[appCrossFieldValidate]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CrossFieldValidateDirective, multi: true },
  ],
})
export class CrossFieldValidateDirective {
  readonly validate = crossFieldValidator;
}