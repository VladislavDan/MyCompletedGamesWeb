import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';

import {Game, Status} from '../../../../types/Game';

@Component({
  selector: 'GameListItemComponent',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListItemComponent {

  @Input()
  public game: Game = {
    console: '',
    id: '',
    isTogether: true,
    name: '',
    status: Status.DONE
  };

  @Output()
  public editGameRequest = new EventEmitter<string>();

  constructor() {
  }

  onEditGame(gameID: string) {
      this.editGameRequest.emit(gameID);
  }
}
