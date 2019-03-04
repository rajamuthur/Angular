import { CanDeactivate } from "@angular/router";
import { CreateEmployeeComponent } from "./create-employee.component";

export class CreateEmployeeCanDeActivateGuard implements CanDeactivate<CreateEmployeeComponent> {
    canDeactivate(component: CreateEmployeeComponent) : boolean {
        if(component.employeeForm.dirty) {
            return confirm('Are you sure, you want to navigate?');
        }
        return true;
    }

}