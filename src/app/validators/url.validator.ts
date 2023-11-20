import { AbstractControl, ValidatorFn } from "@angular/forms"

export class UrlValidator {
    static validWebUrl(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            // eslint-disable-next-line no-useless-escape
            const URL_REGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
            // control.markAsTouched();
            if (URL_REGEXP.test(control.value)) {
                return null
            }
            return {
                invalidWebUrl: true,
            }
        }
    }
}
