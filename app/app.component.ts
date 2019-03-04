import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthServices } from './auth.services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  showLoading = true;
  constructor(private _router: Router, public _authService: AuthServices) {
    this._router.events.subscribe((rEvent: Event) => {
      if (rEvent instanceof NavigationStart) {
        this.showLoading = true;
      }
      if (rEvent instanceof NavigationEnd || rEvent instanceof NavigationCancel || rEvent instanceof NavigationError) {
        this.showLoading = false;
      }
    });
  }

  ngOnInit() {
    
  }

  onLogOut() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
