import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { RestApiService } from './rest-api.service';
import { Employee } from '../models/employee';

describe('RestApiService', () => {
  let service: RestApiService;
  let httpMock: HttpTestingController;

  const sampleEmployee: Employee = { id: '1', name: 'Ian', email: 'ian@test.com', phone: 123 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RestApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('getEmployees fetches the employees list from the API', () => {
    const mock: Employee[] = [sampleEmployee];
    service.getEmployees().subscribe((data) => expect(data).toEqual(mock));

    const req = httpMock.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('getEmployee fetches a single employee by id', () => {
    service.getEmployee('1').subscribe((data) => expect(data).toEqual(sampleEmployee));

    const req = httpMock.expectOne('http://localhost:3000/employees/1');
    expect(req.request.method).toBe('GET');
    req.flush(sampleEmployee);
  });

  it('createEmployee POSTs the employee to the API', () => {
    const payload: Employee = { name: 'Ian', email: 'ian@test.com', phone: 123 };
    service.createEmployee(payload).subscribe((data) => expect(data).toEqual(sampleEmployee));

    const req = httpMock.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(payload);
    req.flush(sampleEmployee);
  });

  it('updateEmployee PUTs the employee to the API', () => {
    const payload: Employee = { name: 'Ian2', email: 'ian2@test.com', phone: 456 };
    service.updateEmployee('1', payload).subscribe((data) => expect(data).toEqual(sampleEmployee));

    const req = httpMock.expectOne('http://localhost:3000/employees/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush(sampleEmployee);
  });

  it('deleteEmployee DELETEs the employee by id', () => {
    service.deleteEmployee('1').subscribe((data) => expect(data).toEqual(sampleEmployee));

    const req = httpMock.expectOne('http://localhost:3000/employees/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(sampleEmployee);
  });
});