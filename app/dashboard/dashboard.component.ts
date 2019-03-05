import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../auth.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  roleName: string;
  constructor(private _auth: AuthServices) { }

  ngOnInit() {
    this.roleName = this._auth.getRoleName() != '' ? this._auth.getRoleName() : "Other";
  }

}
