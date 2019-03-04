import { Component, OnInit } from '@angular/core';
import {EmployeeServices} from './employee-services';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from './employee-interface';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  providers: [EmployeeServices]
})
export class EmployeeDetailsComponent implements OnInit {
  employee: IEmployee;
  empId: number;
  constructor(private _route: ActivatedRoute, private _router: Router, private _empService: EmployeeServices) { }

  ngOnInit() {
    // this.empId = +this._route.snapshot.paramMap.get('id');
    this._route.paramMap.subscribe((params) => {
      this.empId = +params.get('id');
      console.log('new parmas empId: ', this.empId)
      this._empService.getEmployeeListById(this.empId).subscribe((data) => {
        this.employee = data;
        console.log('employee: ', this.employee, 'id: ', this.empId);
      });
    })
  }

  loadNextEmployee() {
    if(this.empId < 4) {
      this.empId = this.empId + 1;
    } else {
      this.empId = 1;
    }
    console.log('newEmpId: ', this.empId);
    this._router.navigate(['employees/view', this.empId], {
      queryParamsHandling: 'preserve'
    });
  }

}
