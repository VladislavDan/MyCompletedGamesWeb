import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {GamesService} from './pages/games/games.service';
import {NavigationEnd, Router} from '@angular/router';
import {LocalStorageService} from './common/services/local-storage.service';
import {Subscription} from 'rxjs';
import {routs} from './common/navigate.constants';
import {MatSidenav} from '@angular/material/sidenav';
import {InitializationDataService} from './common/services/initialization-data.service';
import {ICombinedGamesObject} from './common/types/ICombinedGamesObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('navigationMenu')
  public navigationMenu: MatSidenav | undefined;

  public title = 'MyCompletedGamesWeb';
  public screenLabel = '';
  public isGameScreen = false;

  private routerSubscription: Subscription;
  private gamesLoadChannelSubscription: Subscription;
  private countOfGames = 0;

  constructor(
    private router: Router,
    private gamesService: GamesService,
    private localStorageService: LocalStorageService,
    public initializationDataService: InitializationDataService
  ) {

    this.routerSubscription = this.router.events.subscribe(params => {
      if(params instanceof NavigationEnd) {
        this.isGameScreen = false;
        if(params.url.indexOf(routs.games) >= 0) {
          this.isGameScreen = true;
          this.screenLabel = 'Games ' + this.countOfGames;
        } else if(params.url.indexOf(routs.gameEditor) >= 0) {
          this.screenLabel = 'Edit game';
        } else if(params.url.indexOf(routs.newGame) >= 0) {
          this.screenLabel = 'New game';
        } else if(params.url.indexOf(routs.localBackups) >= 0) {
          this.screenLabel = 'Local backups';
        } else if(params.url.indexOf(routs.googleAuth) >= 0) {
          this.screenLabel = 'Google auth';
        } else if(params.url.indexOf(routs.chart) >= 0) {
          this.screenLabel = 'Chart';
        } else if(params.url.indexOf(routs.googleBackups) >= 0) {
          this.screenLabel = 'Google backups';
        }
        if(params.urlAfterRedirects.indexOf(routs.games) >= 0) {
          this.isGameScreen = true;
        }
      }

      if(this.navigationMenu) {
        this.navigationMenu.close()
      }
    });

    this.gamesLoadChannelSubscription = this.gamesService.gamesLoadChannel.subscribe((games: ICombinedGamesObject) => {
      this.countOfGames = games.Done.length;
      this.screenLabel = `Completed Games ${this.countOfGames}`;
    });
  }

  ngOnInit(): void {
    this.initializationDataService.windowWidth= window.innerWidth;
    this.initializationDataService.windowHeight= window.innerHeight;
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.gamesLoadChannelSubscription.unsubscribe();
  }

  onClickAdd() {
    if(this.router.url.indexOf(routs.games) >= 0) {
      this.router.navigate([routs.newGame])
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.initializationDataService.windowWidth = window.innerWidth;
    this.initializationDataService.windowHeight = window.innerHeight;
  }
}
