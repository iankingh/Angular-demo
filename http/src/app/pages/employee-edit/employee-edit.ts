import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class EmployeeEdit implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly restApi = inject(RestApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly employee = signal<Employee | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      this.router.navigate(['/employees-list']);
      return;
    }
    this.restApi
      .getEmployee(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => this.employee.set(data));
  }

  updateEmployee(): void {
    const current = this.employee();
    if (!current?.id) {
      return;
    }
    this.restApi
      .updateEmployee(current.id, current)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['/employees-list']);
      });
  }
}