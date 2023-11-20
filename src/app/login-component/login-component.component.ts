import { Component, OnInit, ContentChild, ElementRef, Input, ViewChild, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { LoginStatusService } from '../services/loginstatus.service';
import { SocketService } from '../services/socket.service';
import { SessionStorageService } from 'angular-web-storage';
import { BackendConnector } from '../services/backendconnector.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  userId: number = 0;
  loginFormType: number = 0;

  emailFieldInputValue: string = "";
  passwordFieldInputValue: string = "";
  message: string = "";

  passwordField: HTMLInputElement;
  passwordValidationStatus: boolean = false;
  passwordMatchStatus: boolean = false;
  isUserLoggedIn: boolean; // is user in the login state or not 
  invalidPassword: boolean = false;
  invalidEmail: boolean = false;

  tempFormValues;// = {'email' : "", 'password': ""};
  @ViewChild('signinSecondForm') signinSecondForm;
  @ViewChild('signinFirstForm') signinFirstForm;
  //@Input('headerLoginStatus') headerLoginStatus: boolean = false;

  constructor(private connectorService: BackendConnector,
    private loginService: LoginStatusService,
    private formBuilder: FormBuilder,
    private router: Router,
    public session: SessionStorageService,
    private socketService: SocketService) {

    // on refresh after login, open the same page by getting saved url in localStorage
    if (localStorage.getItem('routerUrl') != null)
      this.router.navigate(["/" + localStorage.getItem('routerUrl')]);
  }

  ngOnInit(): void {
    this.userId = parseInt(this.session.get('authUserId'));
    this.loginFormType = 0;
    // checking which form is activated for RegisteredComponent
    //  if (localStorage.getItem("activatedForm") == "signinform") {
    //   // this.LoadSignInForm();
    //  }

    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    console.log("isUserLoggedIn: " + this.isUserLoggedIn);
    // if user loggedIn, then remove header-loginForm
    //  if (this.isUserLoggedIn) {
    // this.loginService.deActivateLoginForm();

    //  }
    //  else {
    // get loginForm visibilty status from LoginService
    // this.showLoginForm = this.loginService.getLoginFormActivationStatus();
    // }
    // keep update about user loggedIn state
    this.loginService.userLoginStatus.subscribe(
      (userLoginStatus: boolean) => {
        this.isUserLoggedIn = userLoginStatus;
      }
    );
  }

  onSignIn(form: NgForm) {
    console.log(form);
    // get user entered data from HTML-FORM
    const EmailorUsername = form.value.emailUsername;
    const password = form.value.password;

    if (!form.valid) {
      this.loginFormType = 1;
      // -- which signIn input fields are not valid (i.e. empty) -----
      // if ((EmailorUsername == "" || EmailorUsername == null) && (password == "" || password == null)) {
      //   this.loginService.setSigninErrorStatus("bothInvalid");
      // }
      // else if (EmailorUsername == "" || EmailorUsername == null) {
      //   this.loginService.setSigninErrorStatus("invalidEmail");
      // }
      // else if (password == "" || password == null) {
      //   this.loginService.setSigninErrorStatus("invalidPassword");
      // }
      // -------------------------------------------------------------

      // If email/username or password is not empty then store it (to show it on signIn component) 
      // if (EmailorUsername != "") {
      //   this.loginService.setUserEmail(EmailorUsername);
      // }
      // if (password != "") {
      //   this.loginService.setUserPassword(password);
      // }
      // -----------------------------------------------------------
      setTimeout(() => {
       this.signinSecondForm.setValue({
            "emailUsername": EmailorUsername,
            "password": password,
        });
        this.tempFormValues = {"emailUsername": EmailorUsername, "password": password};
      }, 500);

      //this.loginService.deActivateLoginForm();
      this.loginService.setForm(this.loginFormType);
    }

    else { // --- if form is valid ----------------------
      this.connectorService.signInRequest({ 'emailORusername': EmailorUsername, 'password': password }).then(
        (signInStatus: any) =>  // get data receieved from backend
        {
          console.log(signInStatus);
          if (!signInStatus.status) { // if response has 'false' in it, then signIn failed
            //   this.loginService.setSigninErrorStatus("incorrectData"); // store error msg, to show it in signIn page
            //  this.loginService.setUserEmail(EmailorUsername); // store username or email
            //   this.loginService.setUserPassword(password);  // store password
            //   this.loginService.deActivateLoginForm();
            this.loginService.setForm(this.loginFormType);
          }
          else {
            if (this.loginFormType == 1) {
              this.loginService.setForm(1);
            }
            // this.loginService.setForm(1);
            this.isUserLoggedIn = true;
            this.loginService.userLoggedIn(); // update LoggedIn status
            this.loginService.loggedUserData = signInStatus.data;
            // this.loginService.deActivateLoginForm(); // deActivate loginForm in headers
            this.session.set("email", EmailorUsername); // store user data in session service
            this.session.set("authUserId", signInStatus.data.user_id);
            this.connectorService.getFriendsData();
            this.router.navigate(['landingpage/home']);
            // this.router.navigate([{outlets: {primary: 'landingpage/home', leftpanel: 'leftPanel/'+0, rightpanel: 'rightPanel/'+0}}]);
          }
        });
    }
  }

  updateFormValues(form: NgForm){
    this.tempFormValues = {"emailUsername": form.value.emailUsername, "password": form.value.password};
  }

  // Show main-page (i.e. Register Component)
  LoadSignUp() {
    this.loginFormType = 0;
    setTimeout(() => { this.signinFirstForm.setValue(this.tempFormValues) }, 500);
    //this.loginService.activateLoginForm();
    //this.loginService.clearInputData();
    this.loginService.setForm(this.loginFormType);
  }

  LoadSignInForm() {
    //this.loginService.deActivateLoginForm();
    this.loginService.setForm(this.loginFormType);
  }

  // SignOut, clear session and navigate to main-page
  // Signout() {
  //   this.session.remove("authUserId");
  //   this.session.remove("email");
  //   this.loginService.userLoggedOut();

  //   // if (localStorage.getItem("activatedForm") == 'signinform') {
  //   //   this.loginService.deActivateLoginForm();
  //   // }
  //   // else {
  //   //   this.loginService.activateLoginForm();
  //   // }
  //   this.signinForm.reset();
  //  // this.loginService.clearInputData();
  //  // this.loginService.setSigninErrorStatus("");
  //   this.loginService.removeRouteData();
  //   this.router.navigate(['/']);
  // }

  // Confirm Password Validation ---------------------------
  validateSignupConfirmPassword(element: HTMLInputElement) {
    if (this.passwordField != null) {
      if (element.value != "") {
        if (this.passwordField.value != element.value && this.passwordField.value != "")
          this.passwordMatchStatus = true;
        else
          this.passwordMatchStatus = false;
      }
      else if (element.value == "" && this.passwordField.value != "") {
        this.passwordMatchStatus = true;
      }
      else {
        this.passwordMatchStatus = false;
      }
    }
  }

  // **** SignIn Form Validation Functions ******************************************************
  validateSigninEmail(element: HTMLInputElement) {
    this.message = '';
    //this.loginService.setUserEmail('');
    this.emailFieldInputValue = '';

    if (element.value.length >= 3) {
      this.invalidEmail = false;
    }
    else {
      this.invalidEmail = true;
    }
  }

  validateSigninPassword(element: HTMLInputElement) {
    this.message = '';
    // this.loginService.setUserPassword('');
    this.passwordFieldInputValue = '';

    if (element.value.length >= 5) {
      this.invalidPassword = false;
    }
    else {
      this.invalidPassword = true;
    }
  }
  // *******************************************************************************************
}
