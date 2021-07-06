import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Game} from '../../../../types/Game';

@Component({
  selector: 'GamesListComponent',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent {

  @Input()
  public games: Game[] = [];

  constructor() {
  }
}
