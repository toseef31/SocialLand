import { Injectable, EventEmitter } from "@angular/core";
import { SessionStorageService } from "angular-web-storage";
import { Subject } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class LoginStatusService {

    // private signInErrorStatus: string = "";
    // private userEmail: string = "";
    // private userPassword: string = "";
    public nextRouteName: string = "";

    // private logInFormActivated: boolean = true;
    private isLoggedIn: boolean = false;
    public loggedUserData = null;
    private activatedForm: string;
 
    // Used in 'Header Component' to keep updates, regarding user login and form status
    userLoginStatus = new EventEmitter<boolean>();
    //loginFormStatus = new EventEmitter<boolean>();

    // Used in 'Register Component' to keep update, regarding user signIn form errors and values
    updateActivatedForm = new Subject<string>();

    constructor(private session: SessionStorageService,
                private router: Router) {
    }

    // *** Related to loginForm in Header ***********************
    // public activateLoginForm() { // Used to Activate loginForm in Header 
    //     this.logInFormActivated = true;
    //     this.loginFormStatus.emit(this.logInFormActivated);
    // }

    // public deActivateLoginForm() { // Used to DeActivate loginForm in Header 
    //     this.logInFormActivated = false;
    //     this.loginFormStatus.emit(this.logInFormActivated);
    // }

    public setForm(formNo: number){
        localStorage.setItem("activatedForm", formNo+'');
        this.activatedForm = formNo+'';
        console.log( this.activatedForm);
        this.updateActivatedForm.next(this.activatedForm);
    }

    // public getForm() {
    //     return this.activatedForm;
    // }

    // public getLoginFormActivationStatus() { // Used to get loginForm status value
    //     return this.logInFormActivated;
    // }

    // *** Related to User Logged In Status **********************
    public userLoggedIn() { // set user logged in status to 'true'
        this.isLoggedIn = true;
        this.userLoginStatus.emit(this.isLoggedIn);
    }

    signOut() {
        this.session.remove("authUserId");
        this.session.remove("email");
        this.userLoggedOut();
        this.removeRouteData();
        this.router.navigate(['/']);
    }

    public userLoggedOut() { // set user logged in status to 'false'
        this.isLoggedIn = false;
        this.userLoginStatus.emit(this.isLoggedIn);
    }

    public isUserLoggedIn() {  // Checks if is user logged in or not using session
      
        if (this.session.get('email') != null && this.session.get('email') != '') {
            this.userLoggedIn();
        }
        else {
            this.userLoggedOut();
        }
      
        return this.isLoggedIn;
    }

    public getuserLogedinStatus() {  // to get the value of loggedIn 
        return this.isLoggedIn;
    }

    // *** Setters and Getters of signInError-name to be used in SignIn-Component *****
    // public setSigninErrorStatus(errorName: string) {
    //     this.signInErrorStatus = errorName;
    // }
    // public getSigninErrorStatus() {
    //     return this.signInErrorStatus;
    // }

    // *** Setters and Getters of header-component signIn-Form to be used in SignIn-Component *****
    // public setUserEmail(data: string) {
    //     this.userEmail = data;
    // }
    // public getUserEmail() {
    //     return this.userEmail;
    // }

    // public setUserPassword(data: string) {
    //     this.userPassword = data;
    // }
    // public getUserPassword() {
    //     return this.userPassword;
    // }

    // to clear header-component stored signIn-form data
    // public clearInputData() {
    //     this.signInErrorStatus = "";
    //     this.userEmail = "";
    //     this.userPassword = "";
    // }

    //--- Store the Routes-Path in LocalStorage to load it, on refreshing the page ------------------
    public setNextRouteName(nextRoute: string){
        this.nextRouteName = nextRoute;
        localStorage.setItem("routerUrl", this.nextRouteName);
    }

    public getNextRouteName(){
        return this.nextRouteName;
    }

    public removeRouteData(){
        this.nextRouteName = '/';
        localStorage.setItem("routerUrl", this.nextRouteName);
    }
    //------------------------------------------------------------------------------------------------
}