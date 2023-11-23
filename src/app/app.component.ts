import { Component } from '@angular/core';
import { FirebaseDBService } from './services/firebase-db.service';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loading: boolean = false;
  loadingTxt: string = "Loading ...";

  constructor(private firebaseDB: FirebaseDBService, router: Router) {
    // this.firebaseDB.autoLogin();

    router.events.subscribe(
      (event) => {
        if (event instanceof RouteConfigLoadStart) {
          this.loading = true;
          this.loadingTxt = "Loading ...";
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loading = false;
          this.loadingTxt = "";
        }
      });
  }

}