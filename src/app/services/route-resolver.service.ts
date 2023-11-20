import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendConnector } from './backendconnector.service';

interface resolverDeclaration {
  'id': number;
  'name': string;
  'status': number;
}

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService implements Resolve<any>{

  constructor(private backendService: BackendConnector) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log("RouteResolverService: ");
    let pageId = +route.params['pageId'];
    console.log(pageId);
    //     return this.backendService.getSinglePage(+route.params['pageNo']);
    return this.backendService.getSinglePage(pageId);
  }

}
