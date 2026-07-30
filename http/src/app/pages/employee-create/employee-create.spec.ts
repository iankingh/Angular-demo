import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { EmployeeCreate } from './employee-create';

describe('EmployeeCreate', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCreate],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(EmployeeCreate);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts with an empty employee model', () => {
    const fixture = TestBed.createComponent(EmployeeCreate);
    expect(fixture.componentInstance.employee).toEqual({
      name: '',
      email: '',
      phone: 0,
    });
  });

  it('renders the create form', async () => {
    const fixture = TestBed.createComponent(EmployeeCreate);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });
});