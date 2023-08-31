import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {routs} from '../../../../common/navigate.constants';
import {ICombinedGamesObject} from '../../../../common/types/ICombinedGamesObject';
import {EStatus} from '../../../../common/types/EStatus';

@Component({
  selector: 'games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent {

  @Input()
  public games: ICombinedGamesObject = {
    [EStatus.TODO]: [],
    [EStatus.ABANDONED]: [],
    [EStatus.DONE]: [],
    [EStatus.IN_PROGRESS]: []
  };
  @Input()
  public listName: EStatus = EStatus.TODO;

  constructor(private router: Router) {
  }

  onEditGame(gameID: number) {
      this.router.navigate([routs.gameEditor, gameID])
  }
}
