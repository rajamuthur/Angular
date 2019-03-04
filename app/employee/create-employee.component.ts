import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeServices } from './employee-services';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { RangeValidator } from '../shared/validators/range-validator';
import { PasswordMatchValidator } from '../shared/validators/password-match-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
  providers: [EmployeeServices]
})
export class CreateEmployeeComponent implements OnInit {

  @Input() emiterName: string;

  employeeForm: FormGroup;

  datePickerConfig: Partial<BsDatepickerConfig>;

  validationErrorMessages = {
    'name': {
      'required': 'Name is required',
      'minLength': 'Name must contain 2-10 characters',
      'maxLength': 'Name must contain 2-10 characters'
    },
    'age': {
      'required': 'Age is required',
      'rangeFailed': 'Age must be between 20-55'
    },
    'gender': {
      'required': 'Gender is required'
    },
    'preference': {
      'required': 'Preference is required'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email is not valid'
    },
    'password': {
      'required': 'Password is required'
    },
    'cpassword': {
      'required': 'Confirm Password is required',
      'passwordMatchFailed': 'Confirm Password should match with password'
    },
    'phoneNumber': {
      'required': 'Phone number is required'
    },
    'isActive': {
      'required': 'Active user is required'
    },
    'dob': {
      'required': 'DOB is required'
    }
  }

  preferenceList = [
    { 'name': 'E-mail', 'code': 'email' },
    { 'name': 'Phone Number', 'code': 'phone' }
  ];

  empFormErr = {
    'name': '',
    'age': '',
    'gender': '',
    'preference': '',
    'email': '',
    'password': '',
    'cpassword': '',
    'phoneNumber': '',
    'isActive': '',
    'dob': ''
  }

  constructor(private _formBuilder: FormBuilder, private _empService: EmployeeServices, private _router: Router) {

  }

  ngOnInit() {
    this.employeeForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      age: ['', [Validators.required, RangeValidator.validateRangeWithParams(20, 55)]],
      gender: ['', [Validators.required]],
      preference: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      dob: ['', [Validators.required]],
    }, { validator: PasswordMatchValidator.matchPasswords('password', 'cpassword') })

    this.employeeForm.valueChanges.subscribe(() => this.showValidationErrors());
    this.datePickerConfig = Object.assign({}, {
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-blue',
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(2018, 4, 12)
    });
  }

  showValidationErrors(fGroup: FormGroup = this.employeeForm) {
    console.log('showValidationErrors: ', fGroup, Object.keys(fGroup.controls));

    Object.keys(fGroup.controls).forEach(fieldCtrlName => {
      const abstractCtrl = fGroup.get(fieldCtrlName);
      if (abstractCtrl instanceof FormGroup) {
        this.showValidationErrors(abstractCtrl);
      } else {
        this.empFormErr[fieldCtrlName] = '';
        if ((abstractCtrl.touched || abstractCtrl.dirty) && !abstractCtrl.valid) {
          for (let errorCategories in abstractCtrl.errors) {
            this.empFormErr[fieldCtrlName] = this.validationErrorMessages[fieldCtrlName][errorCategories];
          }
        }
      }
    });

    if (fGroup.errors && fGroup.errors.passwordMatchFailed) {
      this.empFormErr['cpassword'] = this.validationErrorMessages['cpassword']['passwordMatchFailed'];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propertyName in changes) {
      console.log('CurrentVal: ' + changes[propertyName].currentValue + ', previousValue: ' + changes[propertyName].previousValue);
    }
  }

  onSubmitEmpForm(): void {
    this.showValidationErrors();
    if (this.employeeForm.valid) {
      let empData = Object.assign({}, this.employeeForm.value);
      this._empService.addEmployeeList(empData).subscribe((data) => {
        console.log('on success of add employee: ', data);
        this.employeeForm.reset();
        this._router.navigate(['employees']);
        // this.employeeList = data;
      });
    }
  }

}
