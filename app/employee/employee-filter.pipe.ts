import { PipeTransform, Pipe } from "@angular/core";
import { IEmployee } from "./employee-interface";
@Pipe ({
    name: 'employeeFilterByName',
    pure: true
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(employees: IEmployee[], employeeSearchString: String){
        if(!employees && !employeeSearchString) {
            return employees;
        } else {
            return employees.filter(emp => emp.name.toLowerCase().indexOf(employeeSearchString.toLowerCase()) !== -1);
        }
    }
}