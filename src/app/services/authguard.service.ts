import { CanActivate, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginStatusService } from "./loginstatus.service";
import { FirebaseDBService } from "./firebase-db.service";

// *** This Guard is used to check whether a user can be routed or not ****

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private loginService: LoginStatusService, private router: Router, private firebaseDB: FirebaseDBService) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      //  console.log('1');
        //console.log('authGuard' + this.loginService.isUserLoggedIn());
        if (this.loginService.isUserLoggedIn()) { // if user is logged in, then carry on
            return true;
        }
       // console.log('2');
        // navigate and abort further normal operations by returning false
        this.router.navigate(['/']);
        return false;

            // first case for using userModal of Firebase
        // return this.firebaseDB.userUpdate.pipe(map( user => {
        //     return !!user;
        // }), tap(isAuth=> {
        //   if(!isAuth) // navigate here
        // }))

        // second case for using userModal of Firebase
        // return this.firebaseDB.userUpdate.pipe(take(1), map( user => {
        //     const isAuth = !!user;
        //     if (isAuth) return true;
        //     return this.router.createUrlTree(['/auth']);
        // }))
    }

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate();
    }
}
