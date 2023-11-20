import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';
// import { Event } from '@angular/router';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() defaultColor: string = 'white';
  @Input() highLightColor: string = '#e9e9f5';
  @HostBinding('style.backgroundColor') bgColor: string = 'white';

  constructor(private renderer: Renderer2, private eleRef: ElementRef) { }

  ngOnInit() {
  //  this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'white');
  this.bgColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
   // this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', '#e9e9f5');
   this.bgColor = this.highLightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
   // this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'white');
    this.bgColor = this.defaultColor;
  }
}
