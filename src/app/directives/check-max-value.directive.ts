import { Directive, Input } from "@angular/core"
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms"
import { MaxValueValidator } from "../max-value.validator"

@Directive({
    selector: "[appValidMaxValue]",
    providers: [{ provide: NG_VALIDATORS, useExisting: ValidMaxValueDirective, multi: true }],
})
export class ValidMaxValueDirective implements Validator {
    @Input("max") max: number

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate(control: AbstractControl): { [key: string]: any } | null {
        return this.max ? MaxValueValidator.validMaxValue(this.max)(control) : null
    }
}
