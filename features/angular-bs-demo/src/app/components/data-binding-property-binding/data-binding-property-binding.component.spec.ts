import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBindingPropertyBindingComponent } from './data-binding-property-binding.component';

describe('DataBindingPropertyBindingComponent', () => {
  let component: DataBindingPropertyBindingComponent;
  let fixture: ComponentFixture<DataBindingPropertyBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBindingPropertyBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBindingPropertyBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
