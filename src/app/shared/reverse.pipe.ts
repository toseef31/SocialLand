import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'reverse' })

//[ *** TO MAKE LOOP REVERSE IN TEMPLATES ***]
export class ReversePipe implements PipeTransform{

    transform(value){
      if (!value) return;

      return value.reverse();
    }

}