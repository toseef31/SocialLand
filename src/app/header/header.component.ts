import { BackendConnector } from './../services/backendconnector.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginStatusService } from '../services/loginstatus.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  getProfileSubscription: Subscription;
  addFriendSubscription: Subscription;
  setFriendsSubscription: Subscription;
  //loginSubscription: Subscription;

  allUserdata: any;
  myProfilePic: any = '/assets/pics/noProfile.png';

  friendRequests = [];
  friendSuggestions = [];

  isUserLoggedIn: boolean = false;
  friendSuggestionLimit: number = 2;
  userId: number = 0;
  friendRequestCount: number = 0;
  remainingFriendSuggestions = 0;

  //--------------- Routes ---------------------
  //createPageRoute =  [{outlets: {primary: 'landingpage/timeline', leftpanel: 'leftPanel/'+1, rightpanel: 'rightPanel/'+(2)}}];

  constructor(
    private connectorService: BackendConnector,
    private loginService: LoginStatusService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public session: SessionStorageService,
    private socketService: SocketService) {}

  ngOnInit() {
    this.userId = parseInt(this.session.get('authUserId'));

    // keep update about loginForm visibility state
    // this.loginSubscription = this.loginService.loginFormStatus.subscribe(
    //   (loginFormStatus: boolean) => {
    //     this.showLoginForm = loginFormStatus;
    //   }
    // );

    // keep update about user loggedIn state
    this.loginService.userLoginStatus.subscribe(
      (userLoginStatus: boolean) => {
        this.isUserLoggedIn = userLoginStatus;
      }
    );

    // SUBSCRIBERS --------------------------------------------------------------------------

    this.connectorService.getProfilePic(this.userId);
    //set user profile pic in the header
    this.getProfileSubscription = this.connectorService.setMyProfilePic.subscribe(
      (data: any) => {
        if (data.profilePic != null) {
          this.myProfilePic = data.profilePic;
        }
      }
    )

    if (this.session.get('authUserId') != null)
      this.connectorService.getFriendsData();

    //******************************** */set friendRequest and friends Suggestions ...
    this.setFriendsSubscription = this.connectorService.setFriends.subscribe(
      (friendsData: any) => {

        // Set Received Friend's Requests
        this.friendRequestCount = friendsData.receivedFriendRequestsCount;
        this.friendRequests = friendsData.receivedFriendRequests;

        // Set Friends Suggestions 
        this.friendSuggestions = friendsData.friendSuggestions;

        this.remainingFriendSuggestions = friendsData.remainingFriendsSuggestions;
      });

    // this.connectorService.getFriendsData();
    this.addFriendSubscription = this.socketService.getRequest().subscribe(
      (getfriendsData: any) => {
        let friendsData = getfriendsData.storedFriendRequest;
        let requestUpdated = getfriendsData.requestUpdated;
        let index = 0;
        let selectedIndex = 0;
       // console.log(friendsData);
       // console.log(this.friendSuggestions);

        if (requestUpdated == 0) {
          for (let friend of this.friendSuggestions) {
            if (this.userId == friendsData.receiver_id) {
              if (friendsData.sender_id == friend.user_id) {
                this.friendSuggestions.splice(index, 1);
                this.friendRequests.push(friend);
                this.friendRequestCount++
              }
            }
            index++;
          }
        }

        index = 0;
        for (let friend of this.friendRequests) {
          if (friendsData.receiver_id == friend.receiver_id && friendsData.sender_id == friend.sender_id) {
            if (friendsData.request_status == 1) {
              friend.request_status = 1;
              selectedIndex = index;
              setTimeout(() => {
                this.friendRequests.splice(selectedIndex, 1);
              }, 3000);
            }
            else {
              friend.request_status = 0;
              selectedIndex = index;
              setTimeout(() => {
                this.friendRequests.splice(selectedIndex, 1);
              }, 3000);
            }
          }
          index++;
        }

        for (let friend of this.friendSuggestions) {
          if (friendsData.receiver_id == friend.user_id && friendsData.sender_id == this.userId) {
            friend.request_status = 2;
          }
        }

      });

    //--------------------------------------------------------------------------------------
  }

  openCreatePage(nextRoute: string) {
    this.loginService.setNextRouteName(nextRoute);
  //  this.router.navigate(['landingpage/create-page']);
    //this.router.navigate([{outlets: {primary: 'landingpage/create-page', leftpanel: 'leftPanel/'+0, rightpanel: 'rightPanel/'+0}}]);
  }

  sendFriendRequest(receiverId: number) {
    this.connectorService.sentFriendRequest(this.userId, receiverId, 2);
  }

  acceptFriendRequest(senderId: number, receiver: number) {
    // console.log(senderId);
    // console.log(receiver);
    this.connectorService.FriendRequestUpdate(senderId, receiver, 1);
  }

  rejectFriendRequest(senderId: number, receiver: number) {
    this.connectorService.FriendRequestUpdate(senderId, receiver, 0);
  }

  setRoute(nextRoute: string) {
    this.loginService.setNextRouteName(nextRoute);
    // this.router.navigate([{outlets: {primary: 'landingpage/timeline', leftpanel: 'leftPanel/'+1, rightpanel: 'rightPanel/'+1}}]);
  }

  // LoadFriendSection() {
  //   this.loginService.setNextRouteName('shortcuts/friendsection');
  //   this.router.navigate(['shortcuts/friendsection'])
  // }

  // ************************************************************************************************
  signOut(){
    console.log('signOut');
    this.isUserLoggedIn = false;
    this.loginService.signOut();
  }
  
  resetVariables() {
    this.allUserdata = [];
    this.myProfilePic = "";
    this.friendRequests = [];
    this.friendSuggestions = [];
  }

  ngOnDestroy() {
    this.addFriendSubscription.unsubscribe();
    this.setFriendsSubscription.unsubscribe();
    this.getProfileSubscription.unsubscribe();
   // this.loginSubscription.unsubscribe();
  }
}
