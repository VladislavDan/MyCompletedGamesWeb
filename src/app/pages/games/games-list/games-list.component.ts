import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Game} from '../../../types/Game';
import {Router} from '@angular/router';
import {routs} from '../../../common/navigate.constants';

@Component({
  selector: 'GamesListComponent',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent {

  @Input()
  public games: Game[] = [];

  constructor(private router: Router) {
  }

  onEditGame(gameID: string) {
      this.router.navigate([routs.gameEditor, gameID])
  }
}
