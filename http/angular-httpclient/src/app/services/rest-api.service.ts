import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class RestApiService {
  private readonly http = inject(HttpClient);

  /** Base URL of the JSON-server REST API. */
  readonly apiURL = 'http://localhost:3000';

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** Fetch all employees. */
  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.apiURL}/employees`)
      .pipe(retry(1), catchError(this.handleError));
  }

  /** Fetch a single employee by id. */
  getEmployee(id: string): Observable<Employee> {
    return this.http
      .get<Employee>(`${this.apiURL}/employees/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  /** Create a new employee. */
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`${this.apiURL}/employees`, employee, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /** Update an existing employee. */
  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${this.apiURL}/employees/${id}`, employee, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /** Delete an employee by id. */
  deleteEmployee(id: string): Observable<Employee> {
    return this.http
      .delete<Employee>(`${this.apiURL}/employees/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: unknown): Observable<never> {
    let errorMessage: string;
    if (error instanceof ErrorEvent) {
      errorMessage = error.message;
    } else {
      const e = error as { status?: number; message?: string };
      errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}