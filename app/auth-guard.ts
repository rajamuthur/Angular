import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServices } from './auth.services';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthServices, private _router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.isuserLoggedIn()) {
            let pvName = !_.isUndefined(route.data.pvName) ? route.data.pvName : ''; //Get Privilege Name
            let pvList = this._authService.getUserPrivilegeList();
            console.log('route: ', route, route.data, 'pvName: ', pvName, 'pvList:', pvList);
            if(pvList.indexOf(pvName) !==-1) {
                return true;
            } else {
                this._router.navigate(['/invalid']);
                return false;
            }
        } else {
            this._authService.logout();
            this._router.navigate(['/login']);
            return false;
        }
    }
}