import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../auth.services'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthServices) {
  }

  ngOnInit() {
  }  

  onLogOut() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
