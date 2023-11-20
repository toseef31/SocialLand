import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  formType: boolean = false;
  formButtonTxt: string = "Reactive Form";

  name: string;
  email: string;
  genders = ["male", "female"];
  forbiddenUserNames = ["chris", "ana"];

  @ViewChild('formObject') loginForm;
  defaultQuestion: string = "A";

  signupForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("initializing");
    this.signupForm = new FormGroup({
      'names': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'middlename': new FormControl(null),
        'lastname': new FormControl(null, Validators.required)
      }),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'secret': new FormControl(""),
      'gender': new FormControl('male'),
      'comment': new FormControl('enter your suggestions'),
      'hobbies': new FormArray([])
    })

    // this.signupForm.valueChanges.subscribe((value)=>{
    //   console.log(value);
    // });

    // this.signupForm.statusChanges.subscribe((status)=>{
    //   console.log(status);
    // });

    // --- Reactive Form SetValues
    this.signupForm.setValue({
      'names': {
        'username': "",
        'middlename': "",
        'lastname': ""
      },
      'email': "",
      'secret': "",
      'gender': "male",
      'comment': "enter your comments",
      'hobbies': []
    })

    // var geeks = { 
    //   name : "ABC", 
    //   printFunc: function(){ 
    //     console.log("--- printFunc ---");
    //     console.log(this.name);
    //   } 
    // } 

    //   geeks.printFunc(); 
    //   console.log("*************");
    //   var printFunc2= geeks.printFunc.bind(geeks); 
    //   console.log(printFunc2.name);
    //   printFunc2(); 

  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.loginForm.setValue({
    //     loginData:{
    //       comment: "enter your suggestions",
    //       username: "",
    //       email: "",
    //       secret: "",
    //       gender: "male"
    //     }
    //   })
    // }, 500);
    
    // this.loginForm.form.patchValue({
    //   loginData:{
    //     comment: "enter your suggestions"
    //   }
    // })
    console.log("view rendered");
  }

  changeForm() {
    this.formType = !this.formType;
    if (this.formType) this.formButtonTxt = "Template Form";
    else this.formButtonTxt = "Reactive Form";
  }

  reactiveSubmit() {
    console.log(this.signupForm);
  }

  // form array reactive
  addHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // custom validation
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
      console.log(control);
    //  console.log(this.forbiddenUserNames.indexOf(control.value));
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'forbidden': true }
    }
    return null;
  }

  // async validation
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((res, rej) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          res({ 'emailIsForbidden': true })
        }
        else {
          res(null)
        }
      }, 1500);
    });
    return promise;
  }

  // ************************* TEMPLATE DRIVEN FORM FUNCTIONS *****************************
  resetForm() {
    this.loginForm.reset();
    this.signupForm.reset();
    this.loginForm.form.patchValue({
      loginData: {
        secret: ""
      }
    })
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.name = form.value.username;
    this.email = form.value.email;
  }

  onSubmitForVChild() {
    console.log(this.loginForm);
    this.name = this.loginForm.value.username;
    this.email = this.loginForm.value.email;
  }

  testRouteNav(nextRoute: string) {
    console.log(nextRoute);
    this.router.navigate(['/footer'], { relativeTo: this.activatedRoute });
  }
}
