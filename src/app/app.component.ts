import {Component} from '@angular/core';

import {GamesService} from './screens/games-list/games.service';
import {Game} from './types/Game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'MyCompletedGamesWeb';
  public gamesListLabel = '';

  constructor(private gamesService: GamesService) {
    this.gamesService.gamesLoadChannel.subscribe((games: Game[]) => {
      this.gamesListLabel = 'GamesList (' + games.length + ')'
    });
  }
}
