import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'landingpage', loadChildren: () => import('./landingpage/timeline.module').then(m => m.TimelineModule) },
  { path: 'shortcuts', loadChildren: () => import('./LeftBarShortcuts/shortcuts-routing.module').then(m => m.ShortcutsRoutingModule) }
];

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,
      {
        useHash: true, preloadingStrategy: PreloadAllModules
      }
    )
  ],

  exports: [RouterModule]
})

export class AppRoutingModule { }
