import { Component, OnInit, OnDestroy, Injector, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackendConnector } from '../services/backendconnector.service';
import { SharedDataService } from '../services/shareddata.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { LoginStatusService } from '../services/loginstatus.service';
import { Subscription, interval, Observable, Subject, from } from 'rxjs';
import { map, delay, take, exhaustMap } from 'rxjs/operators';
import { FirebaseDBService } from '../services/firebase-db.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../shared/alert.component'
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { LandingPageServService } from '../landingpage/landing-page-serv.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {

  loginSubscription: Subscription;
  intervalSubscription: Subscription;
  closeSubscription: Subscription;

  dates = [];
  months = [];
  years = [];

  //signinForm: FormGroup;
  signupForm: FormGroup;

  // Form input-fields validation variables
  nameValidationStatus: boolean = false;
  nameInputFieldError: boolean = false;

  emailValidationStatus: boolean = false;
  emailInputFieldError: boolean = false;

  genderValidationStatus: boolean = false;
  birthdayValidationStatus: boolean = false;
  passwordValidationStatus: boolean = false;
  passwordMatchStatus: boolean = false;

  activatedForm: number = 0;
  usernameErrorMsg: string = "";
  emailErrorMsg: string = "";
  message: string = "";
  passwordErrorMsg: string = "";
  friendSuggestionsLimit: number = 2;

  passwordField: HTMLInputElement;

  breakLineStatus: boolean = false;
  invalidPassword: boolean = false;
  invalidEmail: boolean = false;

  // variables used in 'Value- attribute' of input textfields
  emailFieldInputValue: string = "";
  passwordFieldInputValue: string = "";
  error: string = "";

  subject = new Subject<number>();
  @ViewChild(PlaceholderDirective, {static: false}) generateAlert: PlaceholderDirective;

  constructor(private formBuilder: FormBuilder,
    private backendService: BackendConnector,
    private router: Router,
    public session: SessionStorageService,
    private loginService: LoginStatusService,
    private shareService: SharedDataService,
    private firebaseDB: FirebaseDBService,
    private compFactoryResolve: ComponentFactoryResolver
  ) {

    this.shareService.generateYears();
    this.dates = this.shareService.dates;
    this.months = this.shareService.months;
    this.years = this.shareService.years;

    this.setSignUpDefaultValues();
  } //---- Constructor Ends --------------------------------------

  ngOnInit() { 
    // ... [THERE ARE TWO FORMS IN THIS COMPONENT "Registration form" and "SignIn form"] ...

    
    //let formNo = parseInt(localStorage.getItem("activatedForm"));
    // interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // ------------------ MULTICAST SUBJECTS -------------------------
    // this.subject.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`)
    // });
    // this.subject.subscribe({
    //   next: (v) => console.log(`observerB: ${v}`)
    // });

    // this.subject.next(47);
    // this.subject.next(Math.random());

    // const observable = from([1, 2, 3]);
    // observable.subscribe(this.subject); //subject sent as argument in observable subscribe for multicast

    // observable.subscribe((data)=> {
    //   console.log(data);
    // });
    // --------- CUSTOM OBSERVABLE -----------------------------------
    // const customIntervalObservable = Observable.create(observer => {
    //  // let count = 0;
    //  // setInterval(() => {
    //     console.log("AAA");
    //     observer.next(Math.random());
    //     console.log("BBB");
    //    //if (count == 7) {observer.complete();}
    //   //  if (count == 10) observer.error(new Error('cannot pass count 10'));
    //    // count++;
    // //  }, 1000)
    // });

    // this.intervalSubscription = customIntervalObservable.pipe(map((data: number) => {
    //   return 'observable1 : ' + data;
    // })).subscribe((count) => {
    //   console.log(count);
    // }, error => {
    //   alert(error);
    // }, () => {
    //   console.log("subscribe completed");
    // })
    // this.intervalSubscription = customIntervalObservable.pipe(map((data: number) => {
    //   return 'observable2 : ' + data;
    // })).subscribe((count) => {
    //   console.log(count);
    // }, error => {
    //   alert(error);
    // }, () => {
    //   console.log("subscribe completed");
    // })

    // this.intervalSubscription = customIntervalObservable.pipe(map((data: number) => {
    //   return 'Count: ' + (data + 1);
    // })).subscribe((count) => {
    //   console.log(count);
    // }, error => {
    //   alert(error);
    // }, () => {
    //   console.log("subscribe completed");
    // })
    // --------- ----------------------------------- -----------------

    // ------------------ PROMISE VS OBSERVABLES ---------------------
    // const promise = new Promise((data) => {
    //   data(1);
    //   data(2);
    //   data(3);
    // })
    //   .then(element => console.log('Promise ' + element));

    // const observable = new Observable((data) => {
    //   data.next(1);
    //   data.next(2);
    //   data.next(3);
    // }).subscribe(element => console.log('Observable ' + element));
    // --------- ----------------------------------- -----------------
    // for (let i=0; i< 1000; i++){
    //   setTimeout(() => {
    //     console.log(i);
    //   }, 2000);
    // }
    // console.log("****");
    // setTimeout(() => {
    //   console.log("AAAA");
    // }, 1700);
    
    // setTimeout(() => {
    //   console.log("AAA");
    // }, 1000);
    // setTimeout(() => {
    //   console.log("BBB");
    // }, 500);

    // console.log("11111");
    // this.backendService.TESTgetMypage();
    // console.log("22222");
    // setTimeout(() => {
    //   console.log("33333");
    // }, 200);
    // --------- ----------------------------------- -----------------

    this.activatedForm = 0;
    console.log("reigster component: " + this.activatedForm);
    // update form error messages
    this.loginSubscription = this.loginService.updateActivatedForm.subscribe(
      (getActivatedForm: string) => {
        console.log(getActivatedForm);
        this.activatedForm = parseInt(getActivatedForm);
        this.message = "";
        // check error type and set error message ---------------------------------
        // if (this.loginService.getSigninErrorStatus() == "invalidEmail") {
        //   this.invalidEmail = true; this.invalidPassword = false;
        //   this.emailErrorMsg = "invalid email/username";
        // }
        // else if (this.loginService.getSigninErrorStatus() == "invalidPassword") {
        //   this.invalidPassword = true; this.invalidEmail = false;
        //   this.passwordErrorMsg = "invalid password";
        // }
        // else if (this.loginService.getSigninErrorStatus() == "bothInvalid") {
        //   this.invalidPassword = true; this.invalidEmail = true;
        //   this.emailErrorMsg = "invalid email/username";
        //   this.passwordErrorMsg = "invalid password";
        // }
        // else if (this.loginService.getSigninErrorStatus() == "incorrectData") {
        //   this.invalidPassword = this.invalidEmail = false;
        //   this.message = "incorrect email/username or password";
        // }

        // // store username/email and password to show them in input textFields
        // this.emailFieldInputValue = this.loginService.getUserEmail();
        // this.passwordFieldInputValue = this.loginService.getUserPassword();
      });

    // if (this.session.get('authUserId') != null)
    //   this.connectorService.getFriendRequestData(this.friendSuggestionsLimit, '');

    // initialize form inputFields values and Validators
    // this.signinForm = this.formBuilder.group({
    //   username_email: [this.loginService.getUserEmail(), [Validators.required]],
    //   password: [this.loginService.getUserPassword(), Validators.required]
    //  });
  }

  // alertMsg(): void{
  //   alert("hello !!!");
  // }

  // startLoop():void{
  //   for (let i=0; i< 2000; i++){
  //     setTimeout(() => {
  //       console.log(i);
  //     }, 2000);
  //   }
  // }

  onHandleError(){
    this.error = null;
  }

  errorDaal(){
    this.error = "error";
    this.showErrorAlert('im an error');
  }

  private showErrorAlert(msg: string){
    // const newAlert = new AlertComponent();
    const alertCompFactory = this.compFactoryResolve.resolveComponentFactory(AlertComponent);
    const generateContainerRef = this.generateAlert.viewContainerRef;
    generateContainerRef.clear();
    const compRef = generateContainerRef.createComponent(alertCompFactory);

    compRef.instance.message = msg;

    this.closeSubscription = compRef.instance.close.subscribe( ()=> {
      this.closeSubscription.unsubscribe();
      generateContainerRef.clear();
    })
  }

  onSignUp() {  
    // Gender Validation (If gender option is not selected by default)
    if (this.signupForm.value.gender == "gender") {
      if (this.signupForm.value.gender != null)
        this.genderValidationStatus = true;
      else
        this.genderValidationStatus = false;
    }

    // Birthday Validation
    if (this.signupForm.value.date == "" || this.signupForm.value.month == "" || this.signupForm.value.year == "")
      this.birthdayValidationStatus = true;
    else
      this.birthdayValidationStatus = false;

    // Storing User's Register Information in an object
    const signUpdata = {
      'username': this.signupForm.value.username,
      'email': this.signupForm.value.email,
      'gender': this.signupForm.value.gender,
      'date': this.signupForm.value.date,
      'month': this.signupForm.value.month,
      'year': this.signupForm.value.year,
      'password': this.signupForm.value.password,
    };

    this.backendService.signUpRequest(signUpdata).then(
      (responseStatus: any) => {
        if (!responseStatus.status) { // if response is false
          if (responseStatus.message == "nametaken") {
            this.nameValidationStatus = this.nameInputFieldError = true;
            this.usernameErrorMsg = "name already taken";
          }
          if (responseStatus.message == "emailtaken") {
            this.emailValidationStatus = this.emailInputFieldError = true;
            this.emailErrorMsg = "email already taken";
          }
        }
        else { // if response is true
          this.message = "signup successfull";
          this.setSignUpDefaultValues();
          // this.signupForm.reset();
          // this.signinForm.value.gender = 'male';
          // this.signinForm.value.date = 'date';
          // this.signinForm.value.date = 'month';
          // this.signinForm.value.date = 'year';
          this.router.navigate(['/']);
          this.removeMsg();
        }
      });
  }


  onLogin() {
    console.log("onLogin");
    var email_username;
    var password;

    // get and store input fields data
    if (this.emailFieldInputValue != '' && this.emailFieldInputValue != null)
      email_username = this.emailFieldInputValue;
    //  else
    // email_username = this.signinForm.value.username_email;

    if (this.passwordFieldInputValue != '' && this.passwordFieldInputValue != null)
      password = this.passwordFieldInputValue;
    //  else
    //   password = this.signinForm.value.password;

    if (email_username != "" || password != "") { // if required fields are filled
      // console.log(email_username);
      // console.log(password);
      this.backendService.signInRequest({ 'emailORusername': email_username, 'password': password }).then(
        (signInStatusResponse: any) => {
          //   console.log(signInStatusResponse);
          if (!signInStatusResponse.status) { // if response has 'false' in it, then signIn failed
            // this.loginService.setSigninErrorStatus("bothInvalid");
            this.message = "incorrect email/password";
            // this.loginService.setUserEmail('');
            // this.loginService.setUserPassword('');
            this.emailFieldInputValue = '';
            this.passwordFieldInputValue = '';
          }
          else {
            // this.loginService.setSigninErrorStatus("");
            this.loginService.userLoggedIn(); // update LoggedIn status
            //  this.loginService.deActivateLoginForm(); // deActivate loginForm in headers
            this.session.set("email", email_username); // store user data in session service
            this.session.set("authUserId", signInStatusResponse.data.user_id);
            this.backendService.getFriendsData();
            this.loginService.setNextRouteName("landingpage/home");
            this.router.navigate(['landingpage/home']);
            console.log("****** LOGIN *******");
            // this.router.navigate([{outlets: {primary: 'landingpage/home', leftpanel: 'leftPanel/'+0, rightpanel: 'rightPanel/'+0}}]);

            // this.loginService.setUserEmail('');
            // this.loginService.setUserPassword('');
            this.emailFieldInputValue = '';
            this.passwordFieldInputValue = '';
          }
        }
      );
    }
  }

  // ****** SignUp Form Validation Functions **********************************************
  // Username Validation ---------------------------
  validateSignupName(element: HTMLInputElement) {
    this.nameInputFieldError = false;
    if (element.value.length > 0 && element.value.length < 3) {
      this.usernameErrorMsg = "name must be atleast 3 characters"
      this.nameValidationStatus = true;
    }
    else {
      this.usernameErrorMsg = "";
      this.nameValidationStatus = false;
    }
  }

  // Email Validation ------------------------------
  validateSignupEmail(element: HTMLInputElement) {
    this.emailInputFieldError = false;
    if (element.value != "" && this.signupForm.get('email').status == "INVALID") {
      this.emailErrorMsg = "invalid email address";
      this.emailValidationStatus = true;
    }
    else {
      this.emailErrorMsg = "";
      this.emailValidationStatus = false;
    }
  }

  // Birthday Validation ------------------------------
  validateSignupBirthdate(element: HTMLInputElement) {
    if (element.value != "" && (this.signupForm.value.month == "" || this.signupForm.value.year == "")) {
      this.birthdayValidationStatus = true;
    }
    else {
      this.birthdayValidationStatus = false;
    }
  }
  validateSignupBirthmonth(element: HTMLInputElement) {
    if (element.value != "" && (this.signupForm.value.date == "" || this.signupForm.value.year == "")) {
      this.birthdayValidationStatus = true;
    }
    else {
      this.birthdayValidationStatus = false;
    }
  }
  validateSignupBirthyear(element: HTMLInputElement) {
    if (element.value != "" && (this.signupForm.value.date == "" || this.signupForm.value.month == "")) {
      this.birthdayValidationStatus = true;
    }
    else {
      this.birthdayValidationStatus = false;
    }
  }

  // Password Validation ----------------------------
  validateSignupPassword(element: HTMLInputElement) {
    this.passwordField = element;
    this.message = '';

    if (element.value.length == 0) {
      this.breakLineStatus = false;
    }
    if ((element.value.length > 0 && element.value.length < 5) && this.signupForm.value.confirmpassword == "") {
      this.passwordMatchStatus = false;
    }
    if (element.value == this.signupForm.value.confirmpassword) {
      this.breakLineStatus = false;
      this.passwordMatchStatus = false;
      this.passwordValidationStatus = false;
    }

    if (element.value.length > 0 && element.value.length < 5) {
      this.breakLineStatus = true;
      this.passwordValidationStatus = true;
    }
    else if (element.value.length > 0 && element.value != this.signupForm.value.confirmpassword) {
      this.breakLineStatus = false;
      this.passwordMatchStatus = true;
      this.passwordValidationStatus = false;
    }
    else {
      this.passwordValidationStatus = false;
    }
  }

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
    // this.loginService.setUserEmail('');
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
    //this.loginService.setUserPassword('');
    this.passwordFieldInputValue = '';

    if (element.value.length >= 5) {
      this.invalidPassword = false;
    }
    else {
      this.invalidPassword = true;
    }
  }
  // *******************************************************************************************

  setSignUpDefaultValues() {
    // initialize form values and validators
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', [Validators.required]],
      date: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
      confirmpassword: ['', [Validators.required]]
    });
  }

  removeMsg() {
    setTimeout(() => { this.message = ""; }, 1500);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

}// *** Class Ends ***
