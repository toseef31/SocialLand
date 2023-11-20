import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthGuardService } from '../services/authguard.service';
import { DeactivateGuardService } from '../services/deactivateguard.service';

import { ReversePipe } from '../shared/reverse.pipe';
import { ClearspaceDirective } from '../shared/clearspace.directive';
import { DropdownDirective } from '../shared/dropdown.directive';

import { HomeComponent } from './home/home.component';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { TimelineComponent } from '../landingpage/timeline/timeline.component';
import { CreateQuestionairComponent } from './create-questionair/create-questionair.component';
import { CreatePageComponent } from '../LeftBarShortcuts/create-page/create-page.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModuleModule } from '../shared-module.module';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './groups/group/group.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ErrorpageComponent } from '../errorpage/errorpage.component';
import { RouteResolverService } from '../services/route-resolver.service';
import { ScrollServiceService } from '../services/scroll-service.service';
import { ShortenPipe } from '../shared/shorten.pipe';

//, resolve: {pageResolver: RouteResolverService}
const timelineRoutes: Routes = [
  {
    path: '', canActivate: [AuthGuardService], component: LandingpageComponent, children: [
      { path: 'home', component: HomeComponent, canDeactivate: [DeactivateGuardService] },
      { path: 'timeline', component: TimelineComponent },
      { path: 'create-questionair', component: CreateQuestionairComponent},
      {
        path: 'groups', component: GroupsComponent, children: [
          { path: ':pageNo', component: GroupComponent} // Resolver
        ]
      }
    ]
  },
  { path: 'error', component: ErrorpageComponent, data: { messsage: 'Page not found!' } },
  { path: '**', redirectTo: '/landingpage/404' },
]

@NgModule({
  imports: [
    // CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule,
    RouterModule.forChild(timelineRoutes)
  ],
  declarations: [HomeComponent, LandingpageComponent, TimelineComponent,
    ReversePipe, ClearspaceDirective, DropdownDirective, CreatePageComponent,
    AllPostsComponent, GroupsComponent, GroupComponent, CreateQuestionairComponent
  ],
  // providers:[
  //   ScrollServiceService
  // ],
  exports: [RouterModule]
})
export class TimelineModule { }
