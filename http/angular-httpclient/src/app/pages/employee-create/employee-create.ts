import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-create',
  imports: [FormsModule],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.css',
})
export class EmployeeCreate {
  private readonly restApi = inject(RestApiService);
  private readonly router = inject(Router);

  employee: Employee = { name: '', email: '', phone: 0 };

  addEmployee(): void {
    this.restApi.createEmployee(this.employee).subscribe(() => {
      this.router.navigate(['/employees-list']);
    });
  }
}