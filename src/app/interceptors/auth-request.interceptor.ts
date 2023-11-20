import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {

    endpointsToExclude = [
        "/login",
        "/forgot-password"
    ];

    constructor(
        private cookieService: CookieService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /**
         * Check to see if the request should be excluded
         */
        const excludeRequest = this.endpointsToExclude.find(excludedEndpoint => request.url.includes(excludedEndpoint));

        /**
         * Return the original request if the url is in the list of excluded endpoints
         */
        if (excludeRequest) {
            return next.handle(request);
        }

        /**
         * Get the token
         */
        const token = this.cookieService.get('DWS-XSRF-TOKEN');

        /**
         * Check to see that it's not falsey
         * If it is default to an empty string
         */
        const validXSRFToken = token ? token : '';

        /**
         * Add the X-XSRF-TOKEN to every request
         */
        const modifiedRequest = request.clone({
            headers: request.headers.set('X-XSRF-TOKEN', validXSRFToken),
        });

        return next.handle(modifiedRequest);
    }
}
