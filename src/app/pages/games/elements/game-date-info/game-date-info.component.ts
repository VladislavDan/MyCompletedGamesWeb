import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';

import {Game, Status} from '../../../../types/Game';

@Component({
  selector: 'GameDateInfoComponent',
  templateUrl: './game-date-info.component.html',
  styleUrls: ['./game-date-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDateInfoComponent {

  @Input()
  public game: Game = {
    console: '',
    id: '',
    isTogether: true,
    name: '',
    status: Status.DONE
  };
}
