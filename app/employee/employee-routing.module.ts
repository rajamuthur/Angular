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

const routes: Routes = [
  // {
  //   path: 'employees', children: [
      { path: '', component: ListEmployeesComponent, canActivate: [AuthGuard], resolve: { employeeList: EmployeeListResolveSevice } },
      { path: 'create', component: CreateEmployeeComponent, canActivate: [AuthGuard], canDeactivate: [CreateEmployeeCanDeActivateGuard] },
      { path: 'edit/:id', component: EditEmployeeComponent, canActivate: [AuthGuard], canDeactivate: [CreateEmployeeCanDeActivateGuard], resolve: { employee: EmployeeDetailResolveSevice } },
      { path: 'view/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeCanActivateGuardService, AuthGuard] },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {

}
