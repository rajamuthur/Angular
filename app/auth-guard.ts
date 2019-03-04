import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServices } from './auth.services';

@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthServices, private _router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.isuserLoggedIn()) {
            return true;
        } else {
            this._authService.logout();
            this._router.navigate(['/login']);
            return false;
        }
    }
}