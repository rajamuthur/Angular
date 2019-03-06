import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthServices } from './auth.services';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _authService : AuthServices) { }

  intercept(req, next) {
    let token = this._authService.getToken();
    let tokenRq = req.clone({
      setHeaders: {
        Authorization: 'Bearer '+ token
      }
    });

    return next.handle(tokenRq);
  }

}
