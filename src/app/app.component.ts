import { Component } from '@angular/core';
import { FirebaseDBService } from './services/firebase-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  //collection : any;

  constructor(private firebaseDB: FirebaseDBService) {
    //this.collection = [{id: 1}, {id: 2}, {id: 3}];
    this.firebaseDB.autoLogin();
  }
  
  // getItems() {
  //   this.collection = this.getItemsFromServer();
  // }
  
  // getItemsFromServer() {
  //   return [{id: 1}, {id: 22}, {id: 3}, {id: 4}];
  // }
  
  // trackByFn(index, item) {
  //   return index; // or item.id
  // }

}


// loading: boolean;

// constructor(router: Router) {
//   this.loading = false;

//   router.events.subscribe(
//     (event: RouterEvent): void => {
//       // console.log("event: ", event);
//       if (event instanceof RouteConfigLoadStart) {
//         this.loading = true;
//       } else if (event instanceof RouteConfigLoadEnd) {
//         this.loading = false;
//       }
//     });
// }