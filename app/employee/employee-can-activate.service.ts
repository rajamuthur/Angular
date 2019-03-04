import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { EmployeeServices } from "./employee-services";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()

export class EmployeeCanActivateGuardService implements CanActivate {
    isInvalid = false;
    constructor(private _empService: EmployeeServices, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let id = +route.paramMap.get('id'); // + used to convert to number
        return this._empService.getEmployeeListById(id).pipe(map(data => {
            if (!!data) { // !! used to convert to boolean
                return true;
            } else {
                this._router.navigate(['/invalid']);
                return false;
            }
        }));
    }
}