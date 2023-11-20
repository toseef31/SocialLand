import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
  name: 'shorten'
  // pure:false
})
export class ShortenPipe implements PipeTransform {

  initialNumber: number = 0;
  endNumber: number = 0;
  tempSelectedPageNo: number = 0;

  constructor(private router: Router) { }

  transform(value: any, selectedPageNo: number, ...args: unknown[]): unknown {
   if (selectedPageNo == 0) return value.slice(0, 5);
   
   this.tempSelectedPageNo = selectedPageNo - 1;
   this.initialNumber = this.tempSelectedPageNo * 5;    
   this.endNumber = this.initialNumber + 5;

   return value.slice(this.initialNumber, this.endNumber);
  }

}
