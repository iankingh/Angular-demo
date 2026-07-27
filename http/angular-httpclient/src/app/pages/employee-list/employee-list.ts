import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  private readonly restApi = inject(RestApiService);

  readonly employees = signal<Employee[]>([]);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.restApi.getEmployees().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  remove(id: string): void {
    this.restApi.deleteEmployee(id).subscribe(() => this.load());
  }
}