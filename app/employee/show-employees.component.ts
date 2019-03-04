import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IEmployee } from './employee-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'show-emp-detail',
    templateUrl: './show-employees.component.html',
})

export class ShowEmployeesComponent implements OnInit, OnChanges {
    private _empDetails: IEmployee;
    private selectedEmpId : number;

    constructor(private _route:ActivatedRoute, private _router: Router) {}

    @Input()
    set empDetails(val: IEmployee) {
        this._empDetails = val;
    }
    get getEmpDetail() {
        return this._empDetails;
    }    

    @Output() empNameEmitter = new EventEmitter<string>();
    @Output() viewEmployeeCallback: EventEmitter<any> = new EventEmitter();
    @Output() deleteEmployeeCallback: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.selectedEmpId = +this._route.snapshot.paramMap.get('selectedId');
    }

    ngOnChanges(val: SimpleChanges) {
        console.log('val: ', val)
    }

    passDataToParent(emp: IEmployee) {
        console.log('emp: ', emp)
        this.empNameEmitter.emit(emp.name)
    }

    onView_empDetails(id) {
        this.viewEmployeeCallback.emit(id);
    }

    onDelete_empDetails(id) {
        this.deleteEmployeeCallback.emit(id);
    }

    updateEmployee(id) {
        this._router.navigate(['employees/edit', id]);
    }

    getNameAndAge() : string {
        console.log('getNameAndAge: ', this._empDetails);
        return 'Name is: '+this._empDetails.name+ ' and age is: ' + this._empDetails.age;
    }

}