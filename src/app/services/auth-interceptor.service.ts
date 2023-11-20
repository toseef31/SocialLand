import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { tap, exhaustMap, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { FirebaseDBService } from "./firebase-db.service";

@Injectable()
export class authInterceptorService implements HttpInterceptor{

    constructor(private firebaseDB: FirebaseDBService){}
    //executed before the request leaves this application
    intercept(req: HttpRequest<any>, next: HttpHandler ){
        // we can compare url here to restrict this on some urls
        return this.firebaseDB.userUpdate.pipe(take(1), exhaustMap( (user)=> {
            if(!user) return next.handle(req);
            console.log(user);
            const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
            return next.handle(modifiedReq);
        } 
        ));

        // console.log('req incomming');
        // //const modifiedReq = req.clone({url: 'new url here'});
        // // intercepting request here
        // const modifiedReq = req.clone({headers: req.headers.append('auth', '322jr32212d12')});

        // // intercepting response here
        // return next.handle(modifiedReq).pipe(tap (
        //     event => {
        //         console.log(event);
        //     }
        // ));
    }
}