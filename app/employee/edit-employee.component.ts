import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { EmployeeServices } from './employee-services';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { RangeValidator } from '../shared/validators/range-validator';
import { PasswordMatchValidator } from '../shared/validators/password-match-validator';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployee } from './employee-interface';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  providers: [EmployeeServices]
})
export class EditEmployeeComponent implements OnInit {

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
      'required': 'Please accept'
    },
    'dob': {
      'required': 'DOB is required'
    }
  }

  employee: IEmployee;

  empId: number;
  pageTitle: string;
  preferenceList = [
    { 'name': 'E-mail', 'code': 'email' },
    { 'name': 'Phone Number', 'code': 'phoneNumber' }
  ];
  deletedExperianceIds = [];
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

  constructor(private _formBuilder: FormBuilder, private _empService: EmployeeServices, private _router: Router, private _route: ActivatedRoute, private _toaster: ToastrManager) {
    this.empId = +this._route.snapshot.params['id'];
    this.employee = this._route.snapshot.data['employee'];
    if (this.empId == 0) {
      this.pageTitle = 'Create';
    } else {
      this.pageTitle = 'Update';
    }
    console.log('employee:::: ', this.employee);
    // this._route.paramMap.subscribe((params) => {
    //   this.empId = +params.get('id');
    //   console.log('new parmas empId: ', this.empId)
    //   this._empService.getEmployeeListById(this.empId).subscribe((data) => {
    //     this.employee = data;
    //     console.log('employee: ', this.employee, 'id: ', this.empId);
    //   });
    // })
  }

  getFieldValByName(fieldName: string) {
    let resp = this.employee && this.employee[fieldName] ? this.employee[fieldName] : '';
    console.log('fieldName: ', fieldName, 'val: ', resp);
    return resp;
  }

  ngOnInit() {
    this.employeeForm = this._formBuilder.group({
      name: [this.getFieldValByName('name'), [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      age: [this.getFieldValByName('age'), [Validators.required, RangeValidator.validateRangeWithParams(20, 55)]],
      gender: [this.getFieldValByName('gender'), [Validators.required]],
      preference: [this.getFieldValByName('preference'), [Validators.required]],
      email: [this.getFieldValByName('email')],
      phoneNumber: [this.getFieldValByName('phoneNumber')],
      experiances: this.getExperianceFormGroup(),
      password: [this.getFieldValByName('password'), [Validators.required]],
      cpassword: [this.getFieldValByName('password'), [Validators.required]],
      isActive: [this.getFieldValByName('isActive'), [Validators.required]],
      dob: [this.getFieldValByName('dob'), [Validators.required]],
    }, { validator: PasswordMatchValidator.matchPasswords('password', 'cpassword') })

    this.employeeForm.get('preference').valueChanges.subscribe((data: string) => this.changeValidatorsBaseOnPreference(data));
    // this.employeeForm.valueChanges.subscribe(() => this.showValidationErrors());
    this.datePickerConfig = Object.assign({}, {
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-blue',
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(2018, 4, 12)
    });
  }

  createExperianceFormGroup() {
    return this._formBuilder.group({
      skill: ['', [Validators.required]],
      expInMonths: ['', [Validators.required]],
      experianceId: [0]
    });
  }

  getExperianceFormGroup() {
    if(this.empId > 0) {
      let formArray = new FormArray([]);
      if (this.employee.experiances.length > 0) {
        this.employee.experiances.forEach(data => {
          formArray.push(this._formBuilder.group({
            skill: [data.skill, [Validators.required]],
            expInMonths: [data.month_experiance, [Validators.required]],
            experianceId: [data.id]
          }))
        });
      }
      console.log('getExperianceFormGroup emp data: ', this.employee, formArray);
      return formArray;
    } else {
      return this._formBuilder.array([
        this.createExperianceFormGroup()
      ])
    }
  }

  addExperience() {
    (<FormArray>this.employeeForm.get('experiances')).push(this.createExperianceFormGroup());
  }

  removeExperience(index) {
    let expFrmArray = (<FormArray>this.employeeForm.get('experiances'));
    let deletedExp = expFrmArray.at(index);
    console.log('deletedExp: ', deletedExp);
    let deletedExpId = +deletedExp.get('experianceId').value;
    let deleteExp = true;
    if(deletedExpId > 0) {
      if(confirm('Are you sure, you want to delete the experiance?')) {
        this.deletedExperianceIds.push(deletedExpId);
      } else {
        deleteExp = false;
        return false;
      }      
    }
    if(deleteExp) 
      expFrmArray.removeAt(index);
  }

  changeValidatorsBaseOnPreference(data) {
    console.log('changeValidatorsBaseOnPreference data: ', data, this.employeeForm.get(data));
    let abstractCtrl = this.employeeForm.get(data);
    if (data == 'email') {
      abstractCtrl.setValidators([Validators.required, Validators.email]);
      this.employeeForm.get('phoneNumber').clearValidators();
    } else if (data == 'phoneNumber') {
      abstractCtrl.setValidators([Validators.required]);
      this.employeeForm.get('email').clearValidators();
      this.employeeForm.get('email').setValidators(Validators.email);
    }
    abstractCtrl.updateValueAndValidity();
  }

  loadDefaultData() {
    console.log('load default data');
    // this.employeeForm.setValue({ //used to update entire form fields
    this.employeeForm.patchValue({ // used to update partial form fields
      'name': 'Imp',
      'age': '23',
      'gender': 'male',
      'preference': 'phoneNumber',
      'email': 'ss@imp.com',
      'password': '1234',
      'cpassword': '1234',
      'phoneNumber': '3456900',
      'isActive': true,
      'dob': new Date(2018, 5, 12)
    });
    this._toaster.successToastr('Successfully loadded defuault data set for employee');
  }

  showValidationErrors(fGroup: FormGroup = this.employeeForm) {
    console.log('showValidationErrors: ', fGroup, Object.keys(fGroup.controls));

    Object.keys(fGroup.controls).forEach(fieldCtrlName => {
      const abstractCtrl = fGroup.get(fieldCtrlName);
      if (abstractCtrl instanceof FormGroup) {
        this.showValidationErrors(abstractCtrl);
      } else if (abstractCtrl instanceof FormArray) {

        // console.log('abstractCtrl.controls: ', abstractCtrl.controls)
        // for(const arrayCtrl of abstractCtrl.controls) {
        //   if(arrayCtrl instanceof FormGroup) {
        //     this.showValidationErrors(arrayCtrl);
        //   }
        // }
      } else {
        this.empFormErr[fieldCtrlName] = '';
        if ((abstractCtrl.touched || abstractCtrl.dirty) && !abstractCtrl.valid) {
          for (let errorCategories in abstractCtrl.errors) {
            this.empFormErr[fieldCtrlName] = this.validationErrorMessages[fieldCtrlName][errorCategories];
            if (fieldCtrlName == 'isActive') {
              console.log('errorCategories:', errorCategories)
            }
          }
        }
      }
    });

    if (fGroup.errors && fGroup.errors.passwordMatchFailed) {
      this.empFormErr['cpassword'] = this.validationErrorMessages['cpassword']['passwordMatchFailed'];
    }
    console.log('is valid form: ', this.employeeForm.valid);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propertyName in changes) {
      console.log('CurrentVal: ' + changes[propertyName].currentValue + ', previousValue: ' + changes[propertyName].previousValue);
    }
  }

  onSubmitEmpForm(): void {
    this.showValidationErrors();
    console.log('onSUbmitForm: ', this.employeeForm.valid)
    if (this.employeeForm.valid) {
      let empData = Object.assign({}, this.employeeForm.value);
      empData.id = this.empId ? this.empId : 0;
      this.getDeletedEmpExperiance(empData);
      console.log('empData: ', empData, this.employeeForm.valid);
      this._empService.addEmployeeList(empData).subscribe((data) => {
        console.log('on success of add employee: ', data);
        this.employeeForm.reset();
        this._router.navigate(['employees']);
        this._toaster.successToastr('Successfully created/updated employee details');
      },
        ((error: any) => {
          console.log('Failed to add/update employee details: error:', error)
          this._toaster.errorToastr('Failed to create/update employee details');
        }),
        () => {
          console.log('no error occured on create/update employee details');
        }
      );
    }
  }

  getDeletedEmpExperiance(data) {
    if(this.deletedExperianceIds.length > 0) {
      data['deletedExpIds'] = this.deletedExperianceIds
    }
  }

}
