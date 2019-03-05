import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  constructor() { 
    console.log('Inside report component constructor')
  }

  ngOnInit() {
    console.log('Inside report component ngOnInit life cycle. Loaded after constructor completed')
  }

}
