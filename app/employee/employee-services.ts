import { Injectable } from '@angular/core';
import { IEmployee } from './employee-interface';
// import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class EmployeeServices {
    // constructor(private _http: Http){}
    constructor(private _http: HttpClient) { }

    getEmployeeList(): Observable<IEmployee[]> {
        return this._http.get<IEmployee[]>('http://localhost:3000/api/employees/').pipe(catchError(this.handleError));
        // return this._http.get('http://localhost:3000/api/employees/').pipe(map((resp : Response) => <IEmployee[]>resp.json()));
    }

    handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log('client side error');
        } else {
            console.log('server side error');
        }
        return throwError('Unable to complete the process');
        // return of('Unable to complete the process');
    }

    getEmployeeListById(id): Observable<IEmployee> {
        return this._http.get<IEmployee>('http://localhost:3000/api/employees/' + id);
        // return this._http.get('http://localhost:3000/api/employees/').pipe(map((resp : Response) => <IEmployee[]>resp.json()));
    }

    getEmployeeListById1(id): Observable<IEmployee> {
        let resp = this.getEmployeeList().pipe(
            map(details => details.find(emp => emp.id === id))
        );
        console.log('getEmployeeListById1 resp: ', resp);
        return resp;
        // return this._http.get('http://localhost:3000/api/employees/').pipe(map((resp : Response) => <IEmployee[]>resp.json()));
    }

    isValidEmpId(id): Observable<boolean> | boolean {
        console.log('isValidEmpId id: ', id)
        return this.getEmployeeListById(id).pipe(map(data => {
            console.log('isValidEmpId resp: ', data)
            return true;
        }));
    }

    updateEmployeeList(data): Observable<IEmployee[]> {
        console.log('updateEmployeeList data: ', data);
        return this._http.post<IEmployee[]>('http://localhost:3000/api/employees/', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    addEmployeeList(data): Observable<IEmployee[] | string> {
        console.log('addEmployeeList data: ', data);
        return this._http.post<IEmployee[]>('http://localhost:3000/api/employees/', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    deleteEmployeeList(id): Observable<IEmployee[]> {
        console.log('deleteEmployeeList id: ', id);
        return this._http.delete<IEmployee[]>('http://localhost:3000/api/employees/' + id);
    }

    // getEmployeeList1(): IEmployee[] {
    //     return [
    //         {
    //             name: 'RR',
    //             id: 1,
    //             gender: 'male',
    //             preference: 'phoneNumber',
    //             phoneNumber: 123,
    //             isActive: true,
    //             age: 21,
    //             dob: new Date('10/13/2018')
    //         },
    //         {
    //             name: 'Ram',
    //             id: 2,
    //             gender: 'male',
    //             age: 31,
    //             email: 'rr@gmail.com',
    //             preference: 'email',
    //             phoneNumber: 3321334243,
    //             isActive: true,
    //             dob: new Date('3/20/2018')
    //         }
    //     ];
    // }
}