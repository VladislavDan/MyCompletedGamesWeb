import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import {MatListModule} from '@angular/material/list';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GoogleAuthComponent} from './screens/google-auth/google-auth.component';
import {SocialAuthServiceConfig} from './common/social-auth-service.config';
import {GoogleAuthService} from './screens/google-auth/google-auth.service';
import {ErrorComponent} from './screens/error/error.component';
import {ErrorDialog} from './screens/error/error.dialog';
import {ErrorService} from './screens/error/error.service';
import {GamesListComponent} from './screens/games/molecules/games-list/games-list.component';
import {BackupsListComponent} from './screens/google-backups/screen-elements/backups-list/backups-list.component';
import {LocalStorageService} from './common/services/local-storage.service';
import {GamesService} from './screens/games/games.service';
import {GamesComponent} from './screens/games/games.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ConfirmDialog} from './screens/confirm/confirm.dialog';
import {ConfirmService} from './screens/confirm/confirm.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {GameEditorComponent} from './screens/game-editor/game-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartComponent} from './screens/chart/chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {InitializationDataService} from './common/services/initialization-data.service';
import {LocalBackupsComponent} from './screens/local-backups/local-backups.component';
import {LocalBackupsService} from './screens/local-backups/local-backups.service';
import {GameSearchComponent} from './screens/games/molecules/game-search/game-search.component';
import {GoogleBackupsComponent} from './screens/google-backups/google-backups.component';
import {GoogleBackupsService} from './screens/google-backups/google-backups.service';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {NavigationMenuComponent} from './molecules/navigation-menu/navigation-menu.component';
import {GameEditorService} from './screens/game-editor/game-editor.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerComponent} from './screens/spinner/spinner.component';
import {SpinnerService} from './screens/spinner/spinner.service';
import {ConsoleChooserComponent} from './screens/game-editor/molecules/console-chooser/console-chooser.component';
import {StatusComponent} from './screens/games/molecules/games-list/atoms/status/status.component';
import {TogetherIconComponent} from './screens/games/molecules/games-list/atoms/together-icon/together-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleAuthComponent,
    ErrorComponent,
    ErrorDialog,
    GamesListComponent,
    GoogleBackupsComponent,
    BackupsListComponent,
    GamesComponent,
    ConfirmDialog,
    GameEditorComponent,
    ChartComponent,
    LocalBackupsComponent,
    GameSearchComponent,
    NavigationMenuComponent,
    SpinnerComponent,
    ConsoleChooserComponent,
    StatusComponent,
    TogetherIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    SocialLoginModule,
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [
    SocialAuthServiceConfig,
    GoogleAuthService,
    ErrorService,
    GoogleBackupsService,
    LocalStorageService,
    GamesService,
    ConfirmService,
    InitializationDataService,
    LocalBackupsService,
    GameEditorService,
    SpinnerService,
    SocialAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
