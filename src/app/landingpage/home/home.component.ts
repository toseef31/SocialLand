import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoginStatusService } from '../../services/loginstatus.service';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  rightPanelNo: number = 0;
  userId: number = 0;
  showPostStatus: number = 0; // 0- All, 1- My Posts, 2- Friends Only, 3- Page Posts Only

  constructor(private router: Router,
    private loginService: LoginStatusService,
    public session: SessionStorageService) {
  }

  ngOnInit() {
    // this.userId = parseInt(this.session.get('authUserId'));
    // localStorage.setItem('routerUrl', '/landingpage/home');
  } //- *** OnInit Ends *************

  setNextRoute(nextRoute: string) {
    this.loginService.setNextRouteName(nextRoute);
  }
  
  canDeactivateInterface(nextUrl): Observable<boolean> | Promise<boolean> | boolean {
    console.log(localStorage.getItem('routerUrl'));
    if (this.loginService.isUserLoggedIn() && nextUrl == "/"){
      //  this.router.navigate([localStorage.getItem('routerUrl')]);
       return false;
    }
    else
      return true;
  }

  ngOnDestroy() {
  }
}
