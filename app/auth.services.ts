import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from './app.constants';
import * as _ from 'lodash';

@Injectable()

export class AuthServices {
    baseUrl : string;
    constructor(private _httpClient: HttpClient, private _appConstant: AppConstants) {
        this.baseUrl = this._appConstant.baseURL();
    }

    validateLogin(data) : Observable<any> {
        return this._httpClient.post(this.baseUrl + 'validateUser/', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getUserName() {
        let userName = '';
        let userDetails = this.getUsrInfo();
        if(userDetails) {
            userName = userDetails['name'];
        }
        return userName;
    }
    

    getRoleName() {
        let userName = '';
        let userDetails = this.getUsrInfo();
        if(userDetails) {
            userName = userDetails['role'];
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
        localStorage.removeItem("privlieges");
        localStorage.removeItem("role");
    }

    setUsrInfo(data) {
        let info = JSON.stringify(data);
        localStorage.setItem("user", info);   
        localStorage.setItem("privlieges", data['privileges']);
        localStorage.setItem("role", data['role']);
    }

    getUserPrivilegeList() {
        let pvLlist = localStorage.getItem("privlieges");
        return pvLlist;
    }

    getUsrInfo() {
        return  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false;
    }

    isAdmin() {
        let userDetails = this.getUsrInfo();
        let isAdmin = false;
        if(userDetails) {
            isAdmin =  userDetails['role'] == this._appConstant.CONST_ADMIN_ROLE_NAME ? true : false;
        }
        return isAdmin;
    }

    isUser() {
        let userDetails = this.getUsrInfo();
        let isUser = false;
        if(userDetails) {
            isUser =  userDetails['role'] == this._appConstant.CONST_USER_ROLE_NAME ? true : false;
        }
        return isUser;
    }
}