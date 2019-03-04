import { Component, OnInit } from '@angular/core';
import { ErrorService }  from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {

  constructor(public errorService: ErrorService) { 
  }

  ngOnInit() {
  }
}