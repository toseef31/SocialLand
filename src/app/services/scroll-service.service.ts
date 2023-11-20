import { Injectable } from '@angular/core';

import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {

  constructor( private _scrollToService: ScrollToService ) { }

  public scrollToTop() {
    const config: ScrollToConfigOptions = {
        target: 'parentDiv'
    } 
    this._scrollToService.scrollTo(config);
  }

  public scrollToBottom() {
    const config: ScrollToConfigOptions = {
        target: 'bottomDiv'
    } 
    this._scrollToService.scrollTo(config);
  }

}
