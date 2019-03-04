import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { EmployeeServices } from "./employee-services";
import { Injectable } from "@angular/core";
import { IEmployee } from "./employee-interface";
import { catchError } from "rxjs/operators";

@Injectable()

export class EmployeeListResolveSevice implements Resolve<IEmployee[] | string> {
    constructor(private _empService: EmployeeServices) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee[] | string> {
        return this._empService.getEmployeeList().pipe(
            catchError((err: string) => {
                console.log('error: employee list resolve service: ', err)
                return 'Failed';
            })
        );
    }
}