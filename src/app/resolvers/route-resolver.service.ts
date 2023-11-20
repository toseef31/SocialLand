import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendConnector } from '../services/backendconnector.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService implements Resolve<any>{

  constructor(private backendService: BackendConnector) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let pageId = +route.params['pageId'];
    return this.backendService.getSinglePage(pageId);
  }

}
