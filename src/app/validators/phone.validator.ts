import { AbstractControl, ValidatorFn } from "@angular/forms"

export class PhoneValidator {
    static validPhoneNumber(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const NUMBER_REGEXP = /^(\+?)[0-9 ]+$/
            control.markAsTouched()
            if (NUMBER_REGEXP.test(control.value)) {
                return null
            }
            return {
                invalidPhoneNumber: true,
            }
        }
    }
}
