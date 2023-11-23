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
import { AppRoutingModule } from './app-routing.module';
import { SharedDataService } from './services/shareddata.service';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HighlightDirective } from './directives/highlight.directive';
import { PropertyCheckDirective } from './directives/property-check.directive';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { RouteResolverService } from './services/route-resolver.service';
import { authInterceptorService } from './interceptors/auth-interceptor.service';
import { AlertComponent } from './shared/alert.component';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { StoreModule } from '@ngrx/store';
import { landingpageReducer } from './landingpage/landingpage.reducer';

// import { EffectsModule } from '@ngrx/effects';
// import { counterReducer, userReducer } from './_store/reducers/counter.reducer';
// import { UpdateUserEffect } from './_store/effects/update-user.effects';

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
    StoreModule.forRoot({ 'userGroups': landingpageReducer }, {})
  ],

  providers: [
    BackendConnector,
    LoginStatusService,
    SocketService,
    SharedDataService,
    RouteResolverService,
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
  exports: []

})
export class AppModule { }
