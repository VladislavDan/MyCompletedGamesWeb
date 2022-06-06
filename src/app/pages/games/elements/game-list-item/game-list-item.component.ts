import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {IGame, Status} from '../../../../types/IGame';

@Component({
  selector: 'game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListItemComponent {

  @Input()
  public game: IGame = {
    console: '',
    id: -1,
    isTogether: true,
    name: '',
    status: Status.DONE
  };

  @Output()
  public editGameRequest = new EventEmitter<number>();

  constructor() {
  }

  onEditGame(gameID: number) {
      this.editGameRequest.emit(gameID);
  }
}
