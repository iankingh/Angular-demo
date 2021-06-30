import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFormsModelDrivenFormsComponent } from './angular-forms-model-driven-forms.component';

describe('AngularFormsModelDrivenFormsComponent', () => {
  let component: AngularFormsModelDrivenFormsComponent;
  let fixture: ComponentFixture<AngularFormsModelDrivenFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularFormsModelDrivenFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFormsModelDrivenFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
