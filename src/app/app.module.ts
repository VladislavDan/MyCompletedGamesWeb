import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SocialLoginModule} from 'angularx-social-login';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GoogleAuthComponent} from './screens/google-auth/google-auth.component';
import {SocialAuthServiceConfig} from './common/social-auth-service.config';
import {GoogleAuthService} from './screens/google-auth/google-auth.service';
import {ErrorComponent} from './screens/error/error.component';
import {ErrorDialog} from './screens/error/error.dialog';
import {ErrorService} from './screens/error/error.service';
import {GoogleAuthGuardService} from './common/services/google-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    GoogleAuthComponent,
    ErrorComponent,
    ErrorDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    SocialLoginModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [SocialAuthServiceConfig, GoogleAuthService, ErrorService, GoogleAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
