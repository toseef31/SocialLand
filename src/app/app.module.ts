// ********** MODULES ****************************************
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// ********** SERVICES **************************************
import { SocketService } from './services/socket.service';
import { AngularWebStorageModule } from 'angular-web-storage';

// ********** COMPONENTS *************************************
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BackendConnector } from './services/backendconnector.service';
import { LoginStatusService } from './services/loginstatus.service';
import { AuthGuardService } from './services/authguard.service';
import { DeactivateGuardService } from './services/deactivateguard.service';
import { AppRoutingModule } from './app-routing.module';
import { NgxPopper } from 'angular-popper';
import { SharedDataService } from './services/shareddata.service';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HighlightDirective } from './directives/highlight.directive';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { TimelineModule } from './landingpage/timeline.module';
import { PropertyCheckDirective } from './directives/property-check.directive';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { RouteResolverService } from './services/route-resolver.service';
import { ScrollServiceService } from './services/scroll-service.service';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ShortenPipe } from './shared/shorten.pipe';
import { authInterceptorService } from './services/auth-interceptor.service';
import { loggingInterceptorService } from './services/logging-interceptor.service';
import { AlertComponent } from './shared/alert.component';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { StoreModule } from '@ngrx/store';
import { landingpageReducer } from './landingpage/landingpage.reducer';
import { LandingPageServService } from './landingpage/landing-page-serv.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponentComponent,
    //  LeftPanelComponent,
    //  RightPanelComponent,
    HighlightDirective,
    PropertyCheckDirective,
    ErrorpageComponent,
    AlertComponent,
    PlaceholderDirective
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularWebStorageModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPopper,
    StoreModule.forRoot({userGroups: landingpageReducer}, {})
  ],

  providers: [BackendConnector, LoginStatusService, AuthGuardService, DeactivateGuardService,
    SocketService, SharedDataService, RouteResolverService, ScrollServiceService, ScrollToService,
    {
      provide: HTTP_INTERCEPTORS, //identifier of http inteceptor
      useClass: authInterceptorService, //class that will be intercepted
      multi: true  // for multiple inteceptors
    }
    // {
    //   provide: HTTP_INTERCEPTORS, //identifier of http inteceptor
    //   useClass: loggingInterceptorService, //class that will be intercepted
    //   multi: true  // for multiple inteceptors
    // }
  ],

  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ],
  exports: [ScrollServiceService, ScrollToService]

})
export class AppModule { }
