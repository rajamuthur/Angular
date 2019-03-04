import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PasswordMatchValidator {
    static matchPasswords(passwordControl, confirmPasswordControl): ValidatorFn {
        return (control: AbstractControl): { [key: string]: Boolean } | null => {
            let passwordValue = control.get(passwordControl).value;
            let confirmPasswordValue = control.get(confirmPasswordControl).value;
            if (passwordValue != '' && confirmPasswordValue != '' && passwordValue != confirmPasswordValue) {
                return { 'passwordMatchFailed': true };
            }
        }
        return null;
    }
}