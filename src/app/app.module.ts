import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SocialLoginModule} from 'angularx-social-login';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BackupsComponent} from './screens/backups/backups.component';
import {SocialAuthServiceConfig} from './common/SocialAuthServiceConfig';
import {BackupsService} from './screens/backups/backups.service';
import {ErrorComponent} from './screens/error/error-component';
import {ErrorDialog} from './screens/error/error-dialog';
import {ErrorService} from './screens/error/error-service';

@NgModule({
  declarations: [
    AppComponent,
    BackupsComponent,
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
  providers: [SocialAuthServiceConfig, BackupsService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
