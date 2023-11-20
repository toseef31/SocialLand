import { Injectable } from '@angular/core';
import { CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CreatePageComponent } from '../LeftBarShortcuts/create-page/create-page.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleDeactivateGuardService implements CanDeactivate<CreatePageComponent>{

  constructor() { }

  canDeactivate(component: CreatePageComponent,
    currentRouter: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let url: string = nextState.url;
    console.log('Url: ' + url);

    // if (!component.isUpdating && component.countryForm.dirty) {
    //   component.isUpdating = false;
    //   return this.dialogService.confirm('Discard changes for Country?');
    // }
    return true;
  }
}
