import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];


  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }


  @Input() employeeDetails = { name: '', email: '', phone: 0 };

  constructor(
    public router: Router
  ) {




   }

  ngOnInit() {



   }

  addEmployee() {
    // this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
    //   this.router.navigate(['/employees-list']);
    // });
  }
}
