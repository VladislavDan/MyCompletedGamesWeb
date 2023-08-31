import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GamesService} from './games.service';
import {ICombinedGamesObject} from '../../common/types/ICombinedGamesObject';
import {EStatus} from '../../common/types/EStatus';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  public games: ICombinedGamesObject = {
    [EStatus.TODO]: [],
    [EStatus.ABANDONED]: [],
    [EStatus.DONE]: [],
    [EStatus.IN_PROGRESS]: []
  };
  public listName: EStatus = EStatus.TODO;

  private subscription: Subscription = new Subscription();

  constructor(private gamesService: GamesService, private activateRoute: ActivatedRoute) {

    this.subscription.add(activateRoute.params.subscribe(params => this.listName = params['listName']));

    this.subscription.add(gamesService.gamesLoadChannel.subscribe((games: ICombinedGamesObject) => {
      this.games = games;
    }));
  }

  ngOnInit(): void {
    this.gamesService.gamesLoadChannel.next(null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
