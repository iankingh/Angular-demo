import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * 自訂欄位驗證器：姓名不得為 'lala'。
 * Custom field validator: the name must not equal 'lala'.
 */
export const heroNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  control.value === 'lala' ? { heroNameInvalid: true } : null;