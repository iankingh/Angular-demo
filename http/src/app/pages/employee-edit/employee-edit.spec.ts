import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { EmployeeEdit } from './employee-edit';

describe('EmployeeEdit', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEdit],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('creates the component', () => {
    const fixture = TestBed.createComponent(EmployeeEdit);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads the employee by id from the route', async () => {
    const fixture = TestBed.createComponent(EmployeeEdit);
    fixture.detectChanges();
    await fixture.whenStable();

    const req = httpMock.expectOne('http://localhost:3000/employees/1');
    expect(req.request.method).toBe('GET');
    req.flush({ id: '1', name: 'Ian', email: 'ian@test.com', phone: 123 });

    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.employee()?.name).toBe('Ian');
  });
});