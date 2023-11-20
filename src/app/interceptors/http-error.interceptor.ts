import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export class HttpErrorInterceptor implements HttpInterceptor {

  restUrls = {
    'auction_session': '/auction'
  };

  connectionWasLost = false;

  errorMessages = [
    {
      url: this.restUrls.auction_session,
      message: 'There was an issue retrieving your Auctions'
    }
  ];

  excludedEndpoints = [
    this.restUrls.auction_session
  ];

  constructor(
      private toastrService: ToastrService
  ) { }

  private killToken() {
    document.cookie = 'DWS-XSRF-TOKEN' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedEndpoint = this.excludedEndpoints.find(url => url === request.url);

    /**
     * If
     */
    if (excludedEndpoint) {
      return next.handle(request);
    } else if (request.url.includes('/dealer-app/')) {
      return next.handle(request)
      .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';

            // force direct to the login page if unauthorized
            if ((error.statusText === 'Unauthorized' || error.statusText === 'Forbidden')
            // force direct to the login page if connection is restored after lost
            || (this.connectionWasLost && error.statusText === 'OK')) {
              this.killToken();
              if (window.location.href.includes('login')) {
                window.location.reload();
              } else {
                window.location.href = '/login';
              }
              return EMPTY;
            }

            const errorMessageIndex = this.errorMessages.findIndex(e => request.url.includes(e.url));

            /**
             * Pull the correct messages
             */
            if (errorMessageIndex >= 0) {
              errorMessage = this.errorMessages[errorMessageIndex].message;
            }

            /**
             * If the url isn't in the array
             * Send a generic message to the toastr messages
             */
            if (errorMessageIndex === -1) {
              errorMessage = `Error Code: ${error.status} - We've encountered an error`;
            }

            if (error.statusText === 'Unknown Error' || error.statusText === 'Internal Server Error') {
              // when internet connection lost:
              this.connectionWasLost = true;
              // 1) remove auth cookie
              this.killToken();
              // 2) show red notification
              this.toastrService.error('You will be able to log back into the application once the internet is available again',
                'Internet connectivity lost', {
                disableTimeOut: true,
                closeButton: false
              });
            } else {
              this.toastrService.error(errorMessage, `Something isn't quite right`, {
                disableTimeOut: true,
                closeButton: true
              });
            }
            
            throw new Error(`${ errorMessage }`);
          })
      );
    } else {
      return next.handle(request);
    }
  }

}
