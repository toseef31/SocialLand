import { Component, OnInit } from '@angular/core';
import { FirebaseDBService } from '../services/firebase-db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase-test',
  templateUrl: './firebase-test.component.html',
  styleUrls: ['./firebase-test.component.css']
})
export class FirebaseTestComponent implements OnInit {

  authObs: Observable<any>;

  constructor(private firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {

    // this.firebaseDB.simpleSubjectTest.subscribe((res)=> {
    //  console.log("simple subject: "+ res);
    // });

    // this.firebaseDB.behaviourSubjectTest.subscribe((res)=> {
    //   console.log("behaviour subject: "+ res);
    //  });


    this.authObs = this.firebaseDB.getUsersPosts();
    // .subscribe((res)=> {
    //   console.log(res);
    // }, error => {
    //   console.log(error.message);
    // })

    this.authObs.subscribe((res) => {
      console.log(res);
    }, error => {
      console.log(error.message);
    })

    //this.firebaseDB.deletePosts();
  }

  onFireBaseReg(name, email, password) {
    let regData = { 'name': name, 'email': email, 'password': password }
    this.firebaseDB.userRegistration(regData);
  }

  onFireBaseSignup(email, password) {
    this.firebaseDB.userSignup(email, password).subscribe((res) => {
      console.log(res);
    })
  }

  onFireBaseSignin(email, password) {
    this.firebaseDB.userSignin(email, password).subscribe((res) => {
      console.log(res);
    })
  }

  deleteAllFBUsers() {
    this.firebaseDB.deletePosts().subscribe((res) => {
    })
  }

  firebaseLogout() {
    this.firebaseDB.userSignout();
  }

  getUsers() {
    this.firebaseDB.getUsersPostsSecond().subscribe(
      (res) => {
        console.log(res);
      }
    )
    // this.firebaseDB.userUpdate.pipe(take(1)).subscribe( user=> {
    //     console.log(user.token);
    // })
    // console.log("getUsers");
    // this.firebaseDB.userUpdate.pipe(take(1), exhaustMap(
    //   user=> {
    //     console.log(user);
    //     return this.firebaseDB.getUsersPostsSecond();
    //   }
    // ));
  }



  // callSimpleSubject(){ this.firebaseDB.simpleSubject(); }
  // callBehaviourSubject(){ this.firebaseDB.behaviourSubject(); }

  // getSimpleSubjectVal(){ 
  //   this.firebaseDB.simpleSubjectTest.subscribe((res)=> {
  //   console.log("simple subject: "+ res);
  //  }); 
  // }
  // getBehaviourSubjectVal(){
  //   this.firebaseDB.behaviourSubjectTest.subscribe((res)=> {
  //     console.log("behaviour subject: "+ res);
  //    });
  // }
}
