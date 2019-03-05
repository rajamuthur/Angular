import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './list-employees.component';
import { EmployeeListResolveSevice } from './employee-list-resolve.service';
import { EmployeeDetailResolveSevice } from './employee-detail-resolve.service';
import { CreateEmployeeComponent } from './create-employee.component';
import { EditEmployeeComponent } from './edit-employee.component';
import { CreateEmployeeCanDeActivateGuard } from './create-employee-can-deactivate.service';
import { EmployeeCanActivateGuardService } from './employee-can-activate.service';
import { EmployeeDetailsComponent } from './employee-details.component';
import { AuthGuard } from '../auth-guard';
import { AppConstants } from '../app.constants';

const empRoutes: Routes = [
  {
    path: '', children: [
      { path: '', component: ListEmployeesComponent, canActivate: [AuthGuard], resolve: { employeeList: EmployeeListResolveSevice }, data: { 'pvName': 'view-user'} },
      { path: 'create', component: CreateEmployeeComponent, canActivate: [AuthGuard], canDeactivate: [CreateEmployeeCanDeActivateGuard], 
        data: { 'pvName': 'create-user'} },
      { path: 'edit/:id', component: EditEmployeeComponent, canActivate: [AuthGuard], canDeactivate: [CreateEmployeeCanDeActivateGuard], resolve: { employee: EmployeeDetailResolveSevice }, 
        data: { 'pvName': 'create-user'} },
      { path: 'view/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeCanActivateGuardService, AuthGuard], data: { 'pvName': 'view-user'} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(empRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
  constructor(private _appConstants: AppConstants) {

  }

}
