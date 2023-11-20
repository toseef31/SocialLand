import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendConnector } from 'src/app/services/backendconnector.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginStatusService } from 'src/app/services/loginstatus.service';
import { SessionStorageService } from 'angular-web-storage';
import { ShorcutsComponent } from '../shorcuts.component';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  myPages: any;
  sendPic: any;
  rightPanelNo: number = 0;

  // @Output() pageSelected = new EventEmitter<number>();

  constructor(
    private connector: BackendConnector,
    private router: Router,
    private loginService: LoginStatusService,
    public session: SessionStorageService,
    private activePage: ShorcutsComponent,
    private activatedRouter: ActivatedRoute
  ) {
    this.activePage.activeInPage = true;
  }

  onPageClick(page: any) {
    console.log(page);
    this.loginService.setNextRouteName('/shortcuts/page-home/'+ page.page_url);
    this.router.navigate(['/shortcuts/page-home/'+ page.page_id + '/' + page.page_name]);
    // this.pageSelected.emit(pageId);
  }

  ngOnInit() {
    this.connector.getMypageSub.subscribe(
      (getMypageData: any) => {
        console.log(getMypageData[0]);
        this.myPages = getMypageData[0];
      }
    );

    this.connector.getMypage();
  }

  onLoadCreatePage(nextRoute: string) {
    this.loginService.setNextRouteName(nextRoute);
    this.router.navigate(['shortcuts/create-page']);
  }

}
