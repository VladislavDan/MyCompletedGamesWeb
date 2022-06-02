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
import {ErrorComponent} from './parts/error/error.component';
import {ErrorDialog} from './parts/error/error.dialog';
import {ErrorService} from './parts/error/error.service';
import {GamesListComponent} from './pages/games/elements/games-list/games-list.component';
import {BackupsListComponent} from './pages/google-backups/elements/backups-list/backups-list.component';
import {LocalStorageService} from './common/services/local-storage.service';
import {GamesService} from './pages/games/games.service';
import {GamesComponent} from './pages/games/games.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ConfirmDialog} from './parts/confirm/confirm.dialog';
import {ConfirmService} from './parts/confirm/confirm.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {GameEditorComponent} from './pages/game-editor/game-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StatisticComponent} from './pages/statistic/statistic.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {InitializationDataService} from './common/services/initialization-data.service';
import {LocalBackupsComponent} from './pages/local-backups/local-backups.component';
import {LocalBackupsService} from './pages/local-backups/local-backups.service';
import {GameSearchComponent} from './pages/games/elements/game-search/game-search.component';
import {GoogleBackupsComponent} from './pages/google-backups/google-backups.component';
import {GoogleBackupsService} from './pages/google-backups/google-backups.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NavigationMenuComponent} from './parts/navigation-menu/navigation-menu.component';
import {GameEditorService} from './pages/game-editor/game-editor.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerComponent} from './parts/spinner/spinner.component';
import {SpinnerService} from './parts/spinner/spinner.service';
import {ConsoleChooserComponent} from './pages/game-editor/elements/console-chooser/console-chooser.component';
import {StatusComponent} from './pages/games/elements/status/status.component';
import {TogetherIconComponent} from './pages/games/elements/together-icon/together-icon.component';
import {GameListItemComponent} from './pages/games/elements/game-list-item/game-list-item.component';
import {GameDateInfoComponent} from "./pages/games/elements/game-date-info/game-date-info.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats, MatNativeDateModule} from "@angular/material/core";
import {DataBaseService} from "./common/services/data-base-service";
import {StatisticChartComponent} from "./pages/statistic/elements/statistic-chart/statistic-chart.component";
import {
  GameAmountChartsBarComponent
} from "./pages/statistic/elements/game-amount-charts-bar/game-amount-charts-bar.component";
import {
  AmountGamesLimitLineComponent
} from "./pages/statistic/elements/amount-games-limit-line/amount-games-limit-line.component";
import {StatisticFilterComponent} from "./pages/statistic/elements/statistic-filter/statistic-filter.component";
import {StatisticService} from "./pages/statistic/statistic.service";

export const MY_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      day: 'numeric',
      month: 'short',
    } as Intl.DateTimeFormatOptions,
  }
};

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
    StatisticComponent,
    LocalBackupsComponent,
    GameSearchComponent,
    NavigationMenuComponent,
    SpinnerComponent,
    ConsoleChooserComponent,
    StatusComponent,
    TogetherIconComponent,
    GameListItemComponent,
    GameDateInfoComponent,
    StatisticChartComponent,
    GameAmountChartsBarComponent,
    AmountGamesLimitLineComponent,
    StatisticFilterComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
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
    SocialAuthService,
    DataBaseService,
    StatisticService,
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
