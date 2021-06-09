import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBindingPropertyEventBindingComponent } from './data-binding-property-event-binding.component';

describe('DataBindingPropertyEventBindingComponent', () => {
  let component: DataBindingPropertyEventBindingComponent;
  let fixture: ComponentFixture<DataBindingPropertyEventBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBindingPropertyEventBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBindingPropertyEventBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
