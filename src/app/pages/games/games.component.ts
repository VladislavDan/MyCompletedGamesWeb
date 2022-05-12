import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GamesService} from './games.service';
import {Game} from '../../types/Game';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Backup} from "../../types/Backup";
import {IListsVisibility} from "../../types/IListsVisibility";

@Component({
  selector: 'GamesComponent',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  public games: Array<Game[]> = [[], [], []];
  public listsVisibility: IListsVisibility = {
    isDoneVisible: true,
    isInProgress: true,
    isToDoVisible: true
  }

  private gamesLoadChannelSubscription: Subscription;

  constructor(private gamesService: GamesService, private localStorageService: LocalStorageService) {

    this.gamesLoadChannelSubscription = gamesService.gamesLoadChannel.subscribe((games: Array<Game[]>)=>{
      this.games = games;
    });
    this.gamesService.changeListsVisibilityChannel.subscribe((listsVisibility: IListsVisibility) => {
      this.listsVisibility = listsVisibility;
    })

    this.localStorageService.storageChangeChannel
      .subscribe((backup: Backup) => {
        this.gamesService.gamesLoadChannel.next(null);
      });
  }

  ngOnInit(): void {
    this.gamesService.gamesLoadChannel.next(null);
  }

  ngOnDestroy() {
    this.gamesLoadChannelSubscription.unsubscribe();
  }
}
