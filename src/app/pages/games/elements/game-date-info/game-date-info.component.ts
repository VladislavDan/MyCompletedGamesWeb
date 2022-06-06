import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {IGame, Status} from '../../../../types/IGame';

@Component({
  selector: 'game-date-info',
  templateUrl: './game-date-info.component.html',
  styleUrls: ['./game-date-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDateInfoComponent {

  @Input()
  public game: IGame = {
    console: '',
    id: -1,
    isTogether: true,
    name: '',
    status: Status.DONE
  };
}
