import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Game} from '../../types/Game';
import {IBackup} from '../../types/IBackup';
import {Router} from '@angular/router';
import {GamesService} from '../../pages/games/games.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Subscription} from 'rxjs';
import {routs} from '../../common/navigate.constants';

@Component({
  selector: 'NavigationMenuComponent',
  templateUrl: './navigation-menu.conponent.html',
  styleUrls: ['./navigation-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent implements OnDestroy {

  public gamesListLabel = '';

  private gamesLoadChannelSubscription: Subscription;
  private storageChangeChannelSubscription: Subscription;

  constructor(private router: Router,
              private gamesService: GamesService,
              private localStorageService: LocalStorageService) {
    this.gamesLoadChannelSubscription = this.gamesService.gamesLoadChannel.subscribe((games: Array<Game[]>) => {
      setTimeout(() => {
        this.gamesListLabel = `GamesList ${games[0].length + games[1].length + games[2].length}`
      }, 0);
    });

    this.storageChangeChannelSubscription = this.localStorageService.storageChangeChannel
      .subscribe((backup: IBackup) => {
        this.gamesListLabel = 'GamesList (' + backup.games.length + ')';
      });
  }

  ngOnDestroy(): void {
    this.gamesLoadChannelSubscription.unsubscribe();
    this.storageChangeChannelSubscription.unsubscribe();
  }

  openGamesScreen() {
    this.router.navigate([routs.games])
  }

  openGoogleBackupsScreen() {
    this.router.navigate([routs.googleAuth])
  }

  openLocalBackupsScreen() {
    this.router.navigate([routs.localBackups])
  }

  openChartScreen() {
    this.router.navigate([routs.chart])
  }
}
