import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { ViewReportComponent } from './view-report.component';

const reportRoutes: Routes = [
    {
      path: '', children: [
        { path: '', component: ReportComponent},
        { path: 'view', component: ViewReportComponent},
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(reportRoutes)],
    exports: [RouterModule]
})

export class reportRoutingModule {

}