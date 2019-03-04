import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee-interface';
import { EmployeeServices } from './employee-services';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
  providers: [EmployeeServices]
})
export class ListEmployeesComponent implements OnInit {
  empName: string = '';
  employeeListMsg: any;
  empSearchString = '';
  employeeList: IEmployee[];
  error: any;
  // empItem: any;
  // empIndex: number = 0;

  constructor(public _empService: EmployeeServices, private _router: Router, private _route: ActivatedRoute) {
    let resolvedData: IEmployee[] | string = this._route.snapshot.data['employeeList'];
    console.log('resolvedData: ', resolvedData)
    if (Array.isArray(resolvedData)) {
      this.employeeList = resolvedData;
    } else {
      this.error = resolvedData;
    }
    console.log('this.employeeListMsg : ', this.employeeList)
    if (this._route.snapshot.queryParamMap.has('searchName')) {
      this.empSearchString = this._route.snapshot.queryParamMap.get('searchName');
    }
  }

  ngOnInit() {
    // this._empService.getEmployeeList().subscribe((data) => {
    //   this.employeeList = data;
    //   if(this._route.snapshot.queryParamMap.has('searchName')) {
    //     this.empSearchString = this._route.snapshot.queryParamMap.get('searchName');
    //   }
    //   // this.empItem = this.employeeList[this.empIndex];
    // });
  }

  changeName() {
    this.employeeList[0]['name'] = 'New Name';
  }

  displayEmployee(id) {
    this._router.navigate(['employees/view', id], {
      queryParams: { searchName: this.empSearchString }
    });
  }

  showEmpName(data) {
    console.log('parent component data: ', data);
    this.empName = data;
  }

  // loadNextEmpItem() {
  //   console.log('this.empIndex:', this.empIndex);
  //   this.setEmpIndex();
  //   this.empItem = this.employeeList[this.empIndex];
  // }

  // setEmpIndex() {
  //   console.log('len: ', this.employeeList.length, 'index: ', this.empIndex)
  //   if((this.employeeList.length-1) <= this.empIndex) {
  //     this.empIndex = 0;
  //   } else {
  //     this.empIndex += 1;
  //   }
  // }

  deleteEmployee(id) {
    console.log('onDeleteEmpDetails: ', id)
    this._empService.deleteEmployeeList(id).subscribe((data) => {
      console.log('onDeleteEmpDetails success: ', data)
      this.employeeList = data;
    });
  }

}
