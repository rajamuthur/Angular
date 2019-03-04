

import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthServices]
})
export class LoginComponent implements OnInit {

  @Input() emiterName: string;

  loginForm: FormGroup;

  validationErrorMessages = {
    'name': {
      'required': 'Name is required',
      'minLength': 'Name must contain 2-10 characters',
      'maxLength': 'Name must contain 2-10 characters'
    },
    'password': {
      'required': 'Password is required'
    }
  }

  loginFormErr = {
    'name': '',
    'password': ''
  }

  constructor(private _formBuilder: FormBuilder, private _authService: AuthServices, private _router: Router) {
    if(_authService.isuserLoggedIn()) {
      this._router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      password: ['', [Validators.required]]
    })

    this.loginForm.valueChanges.subscribe(() => this.showValidationErrors());    
  }

  showValidationErrors(fGroup: FormGroup = this.loginForm) {
    console.log('Login: showValidationErrors: ', fGroup, Object.keys(fGroup.controls));

    Object.keys(fGroup.controls).forEach(fieldCtrlName => {
      const abstractCtrl = fGroup.get(fieldCtrlName);
      if (abstractCtrl instanceof FormGroup) {
        this.showValidationErrors(abstractCtrl);
      } else {
        this.loginFormErr[fieldCtrlName] = '';
        if ((abstractCtrl.touched || abstractCtrl.dirty) && !abstractCtrl.valid) {
          for (let errorCategories in abstractCtrl.errors) {
            this.loginFormErr[fieldCtrlName] = this.validationErrorMessages[fieldCtrlName][errorCategories];
          }
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propertyName in changes) {
      console.log('CurrentVal: ' + changes[propertyName].currentValue + ', previousValue: ' + changes[propertyName].previousValue);
    }
  }

  onSubmitLoginForm(): void {
    this.showValidationErrors();
    if (this.loginForm.valid) {
      let userData = Object.assign({}, this.loginForm.value);
      console.log('userData: ', userData)
      this._authService.validateLogin(userData).subscribe((data) => {
        console.log('on success of validate employee: ', data);
        this._authService.setUsrInfo(data);
        this._router.navigate(['/dashboard']);
        // this.loginForm.reset();
        // this._router.navigate(['list']);
        // this.employeeList = data;
      });
    }
  }

}
