import { CommonModule } from '@angular/common';  

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsectionComponent } from './friendsection/friendsection.component';
import { AuthGuardService } from '../services/authguard.service';
import { ShorcutsComponent } from './shorcuts.component';
import { MypageComponent } from './mypage/mypage.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { SharedModuleModule } from '../shared.module';
import { CreatePageComponent } from './create-page/create-page.component';
import { RouteResolverService } from '../services/route-resolver.service';
// import { LeftPanelComponent } from '../left-panel/left-panel.component';
// import { RightPanelComponent } from '../right-panel/right-panel.component';

const routes: Routes = [
  {
    path: '',  component: ShorcutsComponent, children: [
        { path: 'friendsection', component: FriendsectionComponent },
        { path: 'mypage', component: MypageComponent },
        { path: 'page-home/:pageId/:page_name', component: PageHomeComponent, resolve: {pageResolver: RouteResolverService}},
        { path: 'create-page', component: CreatePageComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
  declarations: [ FriendsectionComponent, ShorcutsComponent,MypageComponent, PageHomeComponent],
  exports: [RouterModule]
})
export class ShortcutsRoutingModule { }
