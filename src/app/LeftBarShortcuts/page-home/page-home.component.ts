import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendConnector } from 'src/app/services/backendconnector.service';
import { SessionStorageService } from 'angular-web-storage';
import { ShorcutsComponent } from '../../LeftBarShortcuts/shorcuts.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  isPagePic: boolean = false;
  pageData: any;
  userId: number = 0;
  @Output() pageWasSelected = new EventEmitter<number>();
  // pageSelected: number;

  constructor(
    private activePage: ShorcutsComponent,
    private backendService: BackendConnector,
    public session: SessionStorageService,
    private activatedRouter: ActivatedRoute
  ) {
    this.activePage.activeInPage = false;
  }

  ngOnInit() {
    this.userId = this.session.get('authUserId');
    
    this.activatedRouter.data.subscribe(
      (data: any) => {
        this.pageData = data['pageResolver'][0];
        console.log( this.pageData);
      }
    );
  }

  onPageWasSelect(pageId: number) {
    this.pageWasSelected.emit(pageId);
  }

  pagePicFound() {
    this.isPagePic = true;
  }
  pagePicNotFound() {
    this.isPagePic = false;
  }

}


