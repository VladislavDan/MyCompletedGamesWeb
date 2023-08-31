import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {IGame} from '../../../../common/types/IGame';
import {EStatus} from '../../../../common/types/EStatus';
import {GamesService} from '../../games.service';

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
    status: EStatus.DONE
  };

  @Output()
  public editGameRequest = new EventEmitter<number>();
  public imageUrl: string = '';

  constructor(private gameService: GamesService) {
  }

  onEditGame(gameID: number) {
      this.editGameRequest.emit(gameID);
  }
}
