import { Component, OnInit } from '@angular/core';

@Component({
  template: '<h2> 404 Page Not Found </h2>',
  styles: [`
  h2{
    text-align: center;
    position: absolute;
    top: 30%;
    left: 33%;
  }
  `]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
