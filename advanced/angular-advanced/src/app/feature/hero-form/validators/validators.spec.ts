import { FormControl, FormBuilder } from '@angular/forms';
import { heroNameValidator } from './hero-name.validator';
import { crossFieldValidator } from './cross-field.validator';

describe('heroNameValidator', () => {
  it('returns null for a valid name', () => {
    expect(heroNameValidator(new FormControl('ian'))).toBeNull();
  });

  it('errors when name is "lala"', () => {
    expect(heroNameValidator(new FormControl('lala'))).toEqual({ heroNameInvalid: true });
  });
});

describe('crossFieldValidator', () => {
  const fb = new FormBuilder();
  const buildGroup = (name: string, age: number) => fb.group({ name: [name], age: [age] });

  it('returns null when name is not "lala"', () => {
    expect(crossFieldValidator(buildGroup('ian', 12))).toBeNull();
  });

  it('returns null when name is "lala" but age is not 12', () => {
    expect(crossFieldValidator(buildGroup('lala', 30))).toBeNull();
  });

  it('errors when name is "lala" and age is 12', () => {
    expect(crossFieldValidator(buildGroup('lala', 12))).toEqual({ nameAgeInvalid: true });
  });

  it('returns null for non-FormGroup controls', () => {
    expect(crossFieldValidator(new FormControl('x'))).toBeNull();
  });
});