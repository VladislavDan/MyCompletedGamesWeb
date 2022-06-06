import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GamesService} from './games.service';
import {IGame} from '../../types/IGame';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {IBackup} from "../../types/IBackup";
import {IListsVisibility} from "../../types/IListsVisibility";

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

  private gamesLoadChannelSubscription: Subscription;

  constructor(private gamesService: GamesService, private localStorageService: LocalStorageService) {

    this.gamesLoadChannelSubscription = gamesService.gamesLoadChannel.subscribe((games: Array<IGame[]>)=>{
      this.games = games;
    });
    this.gamesService.changeListsVisibilityChannel.subscribe((listsVisibility: IListsVisibility) => {
      this.listsVisibility = listsVisibility;
    })

    this.localStorageService.storageChangeChannel
      .subscribe((backup: IBackup) => {
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
