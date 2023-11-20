import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { throwError, Observable, Subject, BehaviorSubject, interval } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {

  firebaseUrl: string = "https://firebitegames-45f8d.firebaseio.com/";
  firebaseAuthKey: string = "?auth=h56NUvqS7jy2YNb3AehEuYc5YI46oDTnjHzW5giC";

  userUpdate = new BehaviorSubject<User>(null);

  // simpleSubjectTest = new Subject<any>();
  // behaviourSubjectTest = new BehaviorSubject<any>("initial");
  private tokenExpireTime: any;
  constructor(private http: HttpClient) { }

  // simpleSubject(){
  //   this.simpleSubjectTest.next(5);
  // }
  // behaviourSubject(){
  //   this.behaviourSubjectTest.next(5);
  // }

  userSignout() {
    this.userUpdate.next(null);
    localStorage.clear();
    if (this.tokenExpireTime) {
      clearTimeout(this.tokenExpireTime);
    }
  }

  autoLogin() {
    const userData: any = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.userUpdate.next(loadedUser);
      const expireDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expireDuration);
      console.log("valid user");
    }
    else {
      console.log("inValid User");
    }
  }

  autoLogout(expirationDuration: number) {
    console.log("expirationDuration: "+ expirationDuration);
    this.tokenExpireTime = setTimeout(() => {
      this.userSignout();
    }, expirationDuration);

    this.tokenExpireTime = null;
  }

  userSignin(email: string, password: string) {
    return this.http.post<any>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhn8BpyhHGyRcb3edbH13M2TOLeL7_NdM",
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      const expirationDate = new Date(
        new Date().getTime() + +resData.expiresIn * 1000
      );
      const user = new User(
        resData.email,
        resData.localId,
        resData.idToken,
        expirationDate
      );
      this.userUpdate.next(user);
      this.autoLogout(resData.expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    })
    )
  }

  userSignup(email: string, password: string) {
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhn8BpyhHGyRcb3edbH13M2TOLeL7_NdM",
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      }
    ).pipe(catchError(this.handleError))
    // .pipe(catchError(errorRes => {
    //   let errorMsg = "an unknown error occured!";

    //   if (!errorRes.error || !errorRes.error.error) { // for network error
    //     return throwError(errorMsg);
    //   }
    //   switch (errorRes.error.error.message) {
    //     case "EMAIL_EXIST":
    //       errorMsg = "email already exist";
    //       break;
    //     case "OPERATION_NOT_ALLOWED":
    //       errorMsg = "password signIn is disabled right now, try again later";
    //       break;

    //     case "TOO_MANY_ATTEMPTS_TRY_LATER":
    //       errorMsg = "total attempts exceeded, try again later";
    //       break;
    //   }
    //   return throwError(errorMsg);
    // }));

    // .subscribe(
    //   (loginRes: any) => {
    //     console.log(loginRes);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  userRegistration(userRegData: any) {
    this.http.post(this.firebaseUrl + "register.json" + this.firebaseAuthKey, userRegData, {
      observe: 'response' // to get full response, "other: body, events"
    }).subscribe(
      (regRes) => {
        console.log(regRes);
      }
    );
  }

  getUsersPosts() {
    // for multiple http params
    let searchParams = new HttpParams;
    searchParams = searchParams.append('print', 'pretty');

    return this.http.get(this.firebaseUrl + 'register.json', {
      headers: new HttpHeaders({ 'youHeaderKey': 'imAHeader' }),
      params: new HttpParams().set('auth', 'h56NUvqS7jy2YNb3AehEuYc5YI46oDTnjHzW5giC')
    }).pipe(map(
      (res) => {
        // transform backend response data here ...
        console.log(res);
        const regUsers = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            regUsers.push({ ...res[key], id: key });
          }
        }
        return regUsers;
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    )
    // .subscribe(
    //   (allPosts) => {
    //     console.log(allPosts);
    //   }
    // );
  }

  getUsersPostsSecond() {
    console.log("getUsers");

    return this.http.get(this.firebaseUrl + 'register.json');

    // return  this.userUpdate.pipe(take(1), exhaustMap(
    //   user=> {
    //     console.log(user);
    //     return this.http.get(this.firebaseUrl + 'register.json', {
    //       params: new HttpParams().set('auth', user.token)
    //     });
    //   }
    // ));
  }

  deletePosts() {
    return this.http.delete(this.firebaseUrl + 'register.json' + this.firebaseAuthKey, {
      observe: 'events',
      responseType: 'json'  //e.g. json, text, blob(for file)
    }).pipe(
      tap(event => {
        console.log(event);
        //if (event.type === HttpEventType.) // check event type here
      })
    )
  }




  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = "an unknown error occured!";

    if (!errorRes.error || !errorRes.error.error) { // for network error
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXIST":
        errorMsg = "email already exist";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMsg = "password signIn is disabled right now, try again later";
        break;

      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMsg = "total attempts exceeded, try again later";
        break;
    }
    return throwError(errorMsg);
  }
}
