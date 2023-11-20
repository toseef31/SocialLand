import { Observable } from "rxjs";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

// *** This Guard is used to check whether a user can go back or not, using browser back button ****

export interface CanComponentDeactivate {
   // canDeactivate: (url: string) => Observable<boolean> | Promise<boolean> | boolean;
      canDeactivateInterface (url: string) : Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class DeactivateGuardService implements CanDeactivate<CanComponentDeactivate>{
   
    canDeactivate(component: CanComponentDeactivate, currentRouter: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(nextState.url);
        console.log(component);
        console.log("deActivate");
            return component.canDeactivateInterface(nextState.url);
    }
}