import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeFloat'
})
export class RemoveFloatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.trunc(value);
  }

}
