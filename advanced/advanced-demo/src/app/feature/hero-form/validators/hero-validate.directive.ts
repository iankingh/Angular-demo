import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { heroNameValidator } from './hero-name.validator';

/** 套用於樣板驅動 `[(ngModel)]` 欄位的自訂驗證指令。 */
@Directive({
  selector: '[appHeroValidate]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HeroValidateDirective, multi: true }],
})
export class HeroValidateDirective {
  readonly validate = heroNameValidator;
}