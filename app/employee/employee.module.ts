import { NgModule } from '@angular/core';

import { ListEmployeesComponent } from './list-employees.component';
import { ShowEmployeesComponent } from './show-employees.component';
import { EmployeeListResolveSevice } from './employee-list-resolve.service';
import { EmployeeDetailResolveSevice } from './employee-detail-resolve.service';
import { CreateEmployeeComponent } from './create-employee.component';
import { EditEmployeeComponent } from './edit-employee.component';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { EmployeeDetailsComponent } from './employee-details.component';
import { EmployeeFilterPipe } from './employee-filter.pipe';
import { EmployeeCanActivateGuardService } from './employee-can-activate.service';
import { EmployeeServices } from './employee-services';
import { CreateEmployeeCanDeActivateGuard } from './create-employee-can-deactivate.service';
import { EmployeeRoutingModule } from './employee-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListEmployeesComponent,
    ShowEmployeesComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
  ],
  imports: [
    SharedModule,
    BsDatepickerModule.forRoot(),
    EmployeeRoutingModule,
  ],
  providers: [EmployeeServices, CreateEmployeeCanDeActivateGuard, EmployeeListResolveSevice, EmployeeDetailResolveSevice, EmployeeCanActivateGuardService],
})

export class EmployeeModule { }
