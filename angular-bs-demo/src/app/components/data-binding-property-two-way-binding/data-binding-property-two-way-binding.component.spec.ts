import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBindingPropertyTwoWayBindingComponent } from './data-binding-property-two-way-binding.component';

describe('DataBindingPropertyTwoWayBindingComponent', () => {
  let component: DataBindingPropertyTwoWayBindingComponent;
  let fixture: ComponentFixture<DataBindingPropertyTwoWayBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBindingPropertyTwoWayBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBindingPropertyTwoWayBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
