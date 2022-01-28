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
import {GoogleAuthComponent} from './pages/google-auth/google-auth.component';
import {SocialAuthServiceConfig} from './common/social-auth-service.config';
import {GoogleAuthService} from './pages/google-auth/google-auth.service';
import {ErrorComponent} from './pages/error/error.component';
import {ErrorDialog} from './pages/error/error.dialog';
import {ErrorService} from './pages/error/error.service';
import {GamesListComponent} from './pages/games/games-list/games-list.component';
import {BackupsListComponent} from './pages/google-backups/backups-list/backups-list.component';
import {LocalStorageService} from './common/services/local-storage.service';
import {GamesService} from './pages/games/games.service';
import {GamesComponent} from './pages/games/games.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ConfirmDialog} from './pages/confirm/confirm.dialog';
import {ConfirmService} from './pages/confirm/confirm.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {GameEditorComponent} from './pages/game-editor/game-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartComponent} from './pages/chart/chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {InitializationDataService} from './common/services/initialization-data.service';
import {LocalBackupsComponent} from './pages/local-backups/local-backups.component';
import {LocalBackupsService} from './pages/local-backups/local-backups.service';
import {GameSearchComponent} from './pages/games/game-search/game-search.component';
import {GoogleBackupsComponent} from './pages/google-backups/google-backups.component';
import {GoogleBackupsService} from './pages/google-backups/google-backups.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NavigationMenuComponent} from './parts/navigation-menu/navigation-menu.component';
import {GameEditorService} from './pages/game-editor/game-editor.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerComponent} from './pages/spinner/spinner.component';
import {SpinnerService} from './pages/spinner/spinner.service';
import {ConsoleChooserComponent} from './pages/game-editor/console-chooser/console-chooser.component';
import {StatusComponent} from './pages/games/games-list/game-list-item/status/status.component';
import {TogetherIconComponent} from './pages/games/games-list/game-list-item/together-icon/together-icon.component';
import {GameListItemComponent} from './pages/games/games-list/game-list-item/game-list-item.component';

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
    TogetherIconComponent,
    GameListItemComponent
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
