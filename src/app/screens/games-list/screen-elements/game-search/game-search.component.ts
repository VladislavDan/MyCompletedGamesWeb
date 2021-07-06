import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';

import {GamesService} from '../../games.service';

@Component({
  selector: 'GameSearchComponent',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSearchComponent {

  public searchText: string = '';

  constructor(
    private gamesService: GamesService
  ) {

  }

  onChangedSearchText() {
    console.log(this.searchText);
    this.gamesService.gamesLoadChannel.next(this.searchText);
  }
}
