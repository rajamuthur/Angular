import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class AuthServices {
    constructor(private _httpClient: HttpClient) {}

    validateLogin(data) : Observable<any> {
        return this._httpClient.post('http://localhost:3000/api/validateUser/', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getUserName() {
        let userName = '';
        let userDetails = localStorage.getItem("user") ? localStorage.getItem("user") : false;
        if(userDetails) {
            let details = JSON.parse(userDetails);
            userName = details['name'];
        }
        return userName;
    }

    isuserLoggedIn() {
        let resp = localStorage.getItem("user") ? true : false;
        // console.log('isUserloggedIn: ', resp, localStorage.getItem("user"));
        return resp;
    }

    logout() {
        console.log('logout');
        localStorage.removeItem("user");
    }

    setUsrInfo(data) {
        data = JSON.stringify(data);
        localStorage.setItem("user", data)
    }

    getUsrInfo() {
        return JSON.parse(localStorage.getItem("user"))
    }
}