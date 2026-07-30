import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { API_BASE_URL } from '../api-urls';

/** Number of times a failed HTTP request is retried before failing. */
const RETRY_COUNT = 1;

@Injectable({ providedIn: 'root' })
export class RestApiService {
  private readonly http = inject(HttpClient);

  /** Base URL of the JSON-server REST API. */
  private readonly apiUrl = API_BASE_URL;

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** Fetch all employees. */
  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.apiUrl}/employees`)
      .pipe(this.withRetry());
  }

  /** Fetch a single employee by id. */
  getEmployee(id: string): Observable<Employee> {
    return this.http
      .get<Employee>(`${this.apiUrl}/employees/${id}`)
      .pipe(this.withRetry());
  }

  /** Create a new employee. */
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`${this.apiUrl}/employees`, employee, this.httpOptions)
      .pipe(this.withRetry());
  }

  /** Update an existing employee. */
  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${this.apiUrl}/employees/${id}`, employee, this.httpOptions)
      .pipe(this.withRetry());
  }

  /** Delete an employee by id. */
  deleteEmployee(id: string): Observable<Employee> {
    return this.http
      .delete<Employee>(`${this.apiUrl}/employees/${id}`, this.httpOptions)
      .pipe(this.withRetry());
  }

  /** Shared retry + error-handling operator for every request. */
  private withRetry<T>() {
    return (source: Observable<T>) =>
      source.pipe(retry(RETRY_COUNT), catchError((err) => this.handleError(err)));
  }

  private readonly handleError = (error: unknown): Observable<never> => {
    let errorMessage: string;
    if (error instanceof ErrorEvent) {
      errorMessage = error.message;
    } else {
      const e = error as { status?: number; message?: string };
      errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
    }
    return throwError(() => new Error(errorMessage));
  };
}