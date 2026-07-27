import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * 跨欄位驗證器：姓名為 'lala' 且年齡為 12 時，表單無效。
 * Cross-field validator: name 'lala' combined with age 12 is invalid.
 */
export const crossFieldValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  if (!(group instanceof FormGroup)) {
    return null;
  }
  const name = group.get('name')?.value;
  const age = group.get('age')?.value;
  return name === 'lala' && age === 12 ? { nameAgeInvalid: true } : null;
};