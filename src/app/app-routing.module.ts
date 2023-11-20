import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';

import { CommonModule } from '@angular/common';  
import { TimelineModule } from './landingpage/timeline.module';
import { FooterComponent } from './footer/footer.component';

const appRoutes : Routes = [
 { path: '', component: RegisterComponent },
//  { path: 'footer', component: FooterComponent },
 { path: 'landingpage', loadChildren: './landingpage/timeline.module#TimelineModule' },
 { path: 'shortcuts', loadChildren: './LeftBarShortcuts/shortcuts-routing.module#ShortcutsRoutingModule' }
]
//   loadChildren: () => import('./nyan/nyan.module').then(m => m.NyanModule)  LATEST SYNTAX
//  { path: 'iol', loadChildren: () => import('./platform/platform.module').then(m => m.PlatformModule) , canActivate: [AuthGuard] }
@NgModule({
  declarations: [
    
  ],

  imports: [
    CommonModule,
    // TimelineModule,
    RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  
  exports: [RouterModule]
})

export class AppRoutingModule { }
