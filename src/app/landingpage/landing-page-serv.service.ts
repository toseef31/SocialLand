import { Injectable } from '@angular/core';
import * as LandActions from "./landingpage.actions";

@Injectable({
  providedIn: 'root'
})
export class LandingPageServService {

  constructor() { }
  ADD_GROUP:string = "ADD_GROUP";

  manageGroup(userActionType: string) {

    switch (userActionType) {

      case LandActions.ADD_GROUP:
        console.log("add group here");
      break;

      case LandActions.DELETE_GROUP:
        console.log("add group here");
      break;

      default:
        console.error('invalid action type: '+ userActionType);
    }

  }


}
