import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { EmployeeList } from './employee-list';

describe('EmployeeList', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeList],
      providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('creates the component', () => {
    const fixture = TestBed.createComponent(EmployeeList);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads and renders employees from the API', async () => {
    const fixture = TestBed.createComponent(EmployeeList);
    fixture.detectChanges();
    await fixture.whenStable();

    const req = httpMock.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: '1', name: 'Ian', email: 'ian@test.com', phone: 123 },
      { id: '2', name: 'Ada', email: 'ada@test.com', phone: 456 },
    ]);

    fixture.detectChanges();
    await fixture.whenStable();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Ian');
  });
});