import {ChangeDetectionStrategy, Component} from '@angular/core';

import {GamesService} from '../../games.service';
import {InitializationDataService} from '../../../../common/services/initialization-data.service';
import {Filter} from '../../../../common/types/Filter';

@Component({
  selector: 'game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSearchComponent {

  public filter: Filter = {
    searchText: '',
    together: 'none',
    console: 'none',
    status: 'none'
  };

  public consolesNames: string[] = [];

  constructor(
    private gamesService: GamesService,
    private initializationDataService: InitializationDataService
  ) {
      this.consolesNames = initializationDataService.allConsolesName
  }

  onChangedFilter() {
    this.gamesService.gamesLoadChannel.next(this.filter);
  }
}
