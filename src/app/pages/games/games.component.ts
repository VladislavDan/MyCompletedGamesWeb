import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GamesService} from './games.service';
import {IGame} from '../../common/types/IGame';
import {IListsVisibility} from "../../common/types/IListsVisibility";

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  public games: Array<IGame[]> = [[], [], []];
  public listsVisibility: IListsVisibility = {
    isDoneVisible: true,
    isInProgress: true,
    isToDoVisible: true
  }

  private subscription: Subscription = new Subscription();

  constructor(private gamesService: GamesService) {

    this.subscription.add(gamesService.gamesLoadChannel.subscribe((games: Array<IGame[]>)=>{
      this.games = games;
    }));

    this.subscription.add(this.gamesService.changeListsVisibilityChannel.subscribe((listsVisibility: IListsVisibility) => {
      this.listsVisibility = listsVisibility;
    }));
  }

  ngOnInit(): void {
    this.gamesService.gamesLoadChannel.next(null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
