import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AutoGrowDirective } from './directives/auto-group.directives';
// import  { RangeValidatorDirective } from './directives/range-validator.directives';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AccessDeniedComponent } from './acces-denied.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthServices } from  './auth.services';
import { AuthGuard } from  './auth-guard';
import { EmployeeModule } from './employee/employee.module';
import { CustomPreloadingService } from './custom-preloading.services';
import { NotFoundComponent} from './not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AppConstants } from './app.constants';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,    
    AccessDeniedComponent,
    AutoGrowDirective,   
    DashboardComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent        
    // RangeValidatorDirective
  ],
  imports: [
    BrowserModule,    
    // HttpModule,   
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    EmployeeModule,
    ToastrModule.forRoot()
  ],
  exports: [
  ],
  providers: [AuthServices, AuthGuard, CustomPreloadingService, AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
