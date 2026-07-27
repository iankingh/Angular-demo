import { TestBed } from '@angular/core/testing';
import { ReactiveForm } from './reactive-form';

describe('ReactiveForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveForm],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(ReactiveForm);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts invalid because name is empty', () => {
    const fixture = TestBed.createComponent(ReactiveForm);
    expect(fixture.componentInstance.profileForm.valid).toBe(false);
  });

  it('marks name invalid when it equals "lala"', () => {
    const fixture = TestBed.createComponent(ReactiveForm);
    const { name } = fixture.componentInstance.profileForm.controls;
    name.setValue('lala');
    expect(name.errors?.['heroNameInvalid']).toBe(true);
  });

  it('becomes valid with a proper name', () => {
    const fixture = TestBed.createComponent(ReactiveForm);
    fixture.componentInstance.profileForm.controls.name.setValue('ianking');
    expect(fixture.componentInstance.profileForm.valid).toBe(true);
  });

  it('updateProfile patches the name', () => {
    const fixture = TestBed.createComponent(ReactiveForm);
    fixture.componentInstance.updateProfile();
    expect(fixture.componentInstance.profileForm.controls.name.value).toBe('12345');
  });
});