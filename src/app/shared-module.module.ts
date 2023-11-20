import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { FilterPipe } from './shared/filter.pipe';
import { FirebaseTestComponent } from './firebase-test/firebase-test.component';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { AlertComponent } from './shared/alert.component';


@NgModule({
  declarations: [LeftPanelComponent, RightPanelComponent, PageNotFoundComponent, ShortenPipe, 
                 FilterPipe, FirebaseTestComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
 
  exports: [LeftPanelComponent, RightPanelComponent, PageNotFoundComponent, ShortenPipe, FilterPipe, CommonModule]
})
export class SharedModuleModule { }
