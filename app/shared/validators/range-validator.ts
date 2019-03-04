import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

// @Directive({
// selector : '[rangeValidator]',
// providers: [{
//     provide: NG_VALIDATORS,
//     useExisting: RangeValidatorDirective,
//     multi: true
// }]
// })

export class RangeValidator {
    static validateRangeWithParams(minLen: number, maxLen): ValidatorFn {
        return (control: AbstractControl): { [key: string]: Boolean } | null => {
            if (control.value != '' && (isNaN(control.value) || control.value < minLen || control.value > maxLen)) {
                return { 'rangeFailed': true };
            }
            return null;
        }
    }

    static validateRangeWIthoutParams(control: AbstractControl): { [key: string]: Boolean } | null {
        if (control.value != '' && !isNaN(control.value) && (control.value < 20 || control.value > 55)) {
            return { 'rangeFailed': true };
        }
        return null;
    }
}