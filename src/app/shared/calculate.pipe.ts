import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'calculate' })

export class CalculatePipe implements PipeTransform{

    transform(val:number):number {
        val++;
        return val;
     }
}