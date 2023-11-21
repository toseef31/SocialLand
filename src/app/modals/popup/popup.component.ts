import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

// AfterViewInit, OnChanges, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, OnDestroy
export class PopupComponent implements OnInit, OnDestroy {

  @Input({ required: false }) description: any;
  @Input({ required: false }) headingText: any;
  
  constructor() {
    console.log("popup: constructor");
  }

  public setData(data: any) {
    this.headingText = data.title;
    this.description = data.description;
  }

  ngOnInit() {
    console.log("popup: ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("popup: ngOnDestroy");
  }

}
