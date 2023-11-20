import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPropertyCheck]'
})
export class PropertyCheckDirective {

  @Input() set appPropertyCheck(condition: boolean){
    if (!condition){
     console.log("condition false");
     this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      console.log("condition true");
      this.viewContainerRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

}
