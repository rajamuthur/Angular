import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { ViewReportComponent } from './view-report.component';
import { SharedModule } from '../shared/shared.module';
import { reportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [ReportComponent, ViewReportComponent],
  imports: [    
    SharedModule,
    reportRoutingModule
  ]
})
export class ReportsModule { }
