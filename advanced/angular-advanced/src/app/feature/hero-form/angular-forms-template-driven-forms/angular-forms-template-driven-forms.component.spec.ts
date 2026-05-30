import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFormsTemplateDrivenFormsComponent } from './angular-forms-template-driven-forms.component';

describe('AngularFormsTemplateDrivenFormsComponent', () => {
  let component: AngularFormsTemplateDrivenFormsComponent;
  let fixture: ComponentFixture<AngularFormsTemplateDrivenFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularFormsTemplateDrivenFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFormsTemplateDrivenFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
