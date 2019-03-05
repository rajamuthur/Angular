import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { AccessDeniedComponent } from './acces-denied.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from  './auth-guard';
import { CustomPreloadingService } from './custom-preloading.services';
import { EmployeeModule } from './employee/employee.module';
import { NotFoundComponent} from './not-found/not-found.component';
import { ReportsModule } from './reports/reports.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { 'pvName': 'dashboard'}},
  { path: 'reports', loadChildren: './reports/reports.module#ReportsModule', data: { preload: false}}, //Lazy loading
  // { path: 'reports', loadChildren: () => ReportsModule, data: { preload: true}}, //Lazy loading
  { path: 'invalid', component: AccessDeniedComponent},
  { path: 'employees', loadChildren: './employee/employee.module#EmployeeModule', data: { preload: true}}, //Lazy loading
  // { path: 'employees', loadChildren: () => EmployeeModule, data: { preload: true}}, //Lazy loading
  { path : '', redirectTo : '/dashboard', pathMatch : 'full' },
  { path : '**', component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingService})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
