import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {IGame} from '../../../../common/types/IGame';
import {Router} from '@angular/router';
import {routs} from '../../../../common/navigate.constants';
import {IListsVisibility} from "../../../../common/types/IListsVisibility";
import {GamesService} from "../../games.service";

@Component({
  selector: 'games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent {

  @Input()
  public games: Array<IGame[]> = [[], [], []];
  @Input()
  public listVisibility: IListsVisibility = {
    isDoneVisible: false,
    isInProgress: false,
    isToDoVisible: false
  }

  constructor(private router: Router, private gamesService: GamesService) {
  }

  onChangeToDoVisibility() {
    this.gamesService.changeListsVisibilityChannel.next({
      ...this.listVisibility,
      isToDoVisible: !this.listVisibility.isToDoVisible
    })
  }

  onChangeInProgressVisibility() {
    this.gamesService.changeListsVisibilityChannel.next({
      ...this.listVisibility,
      isInProgress: !this.listVisibility.isInProgress
    })
  }

  onChangeDoneVisibility() {
    this.gamesService.changeListsVisibilityChannel.next({
      ...this.listVisibility,
      isDoneVisible: !this.listVisibility.isDoneVisible
    })
  }

  onEditGame(gameID: number) {
      this.router.navigate([routs.gameEditor, gameID])
  }
}
