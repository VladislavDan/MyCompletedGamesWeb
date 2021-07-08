import {Component} from '@angular/core';

import {GamesService} from './screens/games-list/games.service';
import {Game} from './types/Game';
import {Router} from '@angular/router';
import {routs} from './common/navigate.constants';
import {LocalStorageService} from './common/services/local-storage.service';
import {switchMap} from 'rxjs/operators';
import {Backup} from './types/Backup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'MyCompletedGamesWeb';
  public gamesListLabel = '';

  constructor(private router: Router, private gamesService: GamesService, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.gamesService.gamesLoadChannel.subscribe((games: Game[]) => {
      setTimeout(() => {
        this.gamesListLabel = 'GamesList (' + games.length + ')'
      }, 0);
    });

    this.localStorageService.storageChangeChannel
      .subscribe((backup: Backup) => {
        this.gamesListLabel = 'GamesList (' + backup.games.length + ')';
      });

    this.router.navigate([routs.googleAuth]);
  }
}