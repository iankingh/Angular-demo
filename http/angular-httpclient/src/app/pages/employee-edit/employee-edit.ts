import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-edit',
  imports: [FormsModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css',
})
export class EmployeeEdit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly restApi = inject(RestApiService);

  readonly employee = signal<Employee | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.restApi.getEmployee(id).subscribe((data) => this.employee.set(data));
  }

  updateEmployee(): void {
    const current = this.employee();
    if (!current?.id) return;
    this.restApi.updateEmployee(current.id, current).subscribe(() => {
      this.router.navigate(['/employees-list']);
    });
  }
}