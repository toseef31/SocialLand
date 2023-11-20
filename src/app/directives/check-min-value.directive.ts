import { Directive, Input } from "@angular/core"
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms"
import { MinValueValidator } from "../min-value.validator"

@Directive({
    selector: "[appValidMinValue]",
    providers: [{ provide: NG_VALIDATORS, useExisting: ValidMinValueDirective, multi: true }],
})
export class ValidMinValueDirective implements Validator {
    @Input("min") min: number

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate(control: AbstractControl): { [key: string]: any } | null {
        return this.min ? MinValueValidator.validMinValue(this.min)(control) : null
    }
}
