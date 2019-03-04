import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { EmployeeServices } from "./employee-services";
import { Injectable } from "@angular/core";
import { IEmployee } from "./employee-interface";
import { map } from 'rxjs/operators';

@Injectable()

export class EmployeeDetailResolveSevice implements Resolve<IEmployee | boolean> {
    constructor(private _empService: EmployeeServices) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee> | Promise<IEmployee> | boolean {
        let empId = +route.params['id'];
        if(empId > 0) {
            console.log('emp detail service: ', empId, route.params)
            return this._empService.getEmployeeListById(empId);  
        }        
        return false;
    }
}