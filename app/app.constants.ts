import { Injectable } from "@angular/core";

@Injectable()

export class AppConstants {
    baseURL(): string { 
        return "http://localhost:3000/api/"; 
    }
    CONST_ADMIN_ROLE_NAME = 'admin';
    CONST_USER_ROLE_NAME = 'user';

    CONST_DASHBOARD_PV_NAME = 'dashboard';
    CONST_USER_VIEW_PV_NAME = 'view-user';
    CONST_USER_EDIT_PV_NAME = 'create-user';
    CONST_REPORTS_PV_NAME = 'reports';
}