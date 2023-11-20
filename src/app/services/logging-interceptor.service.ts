import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

export class loggingInterceptorService implements HttpInterceptor {

    //executed before the request leaves this application
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(req.url);
        return next.handle(req);
    }
}