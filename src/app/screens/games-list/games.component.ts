import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GamesService} from './games.service';
import {Game} from '../../types/Game';
import {LocalStorageService} from '../../common/services/local-storage.service';

@Component({
  selector: 'GamesComponent',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  public games: Game[] = [];

  private gamesLoadChannelSubscription: Subscription;
  private gameSaveChannelSubscription: Subscription;

  constructor(private gamesService: GamesService, private localStorageService: LocalStorageService) {

    this.games = this.localStorageService.getBackupFromStorage().games;

    this.gamesLoadChannelSubscription = gamesService.gamesLoadChannel.subscribe((games: Game[])=>{
    });

    this.gameSaveChannelSubscription = gamesService.gameSaveChannel.subscribe((games: Game[])=>{
    });

    this.gameSaveChannelSubscription = gamesService.gameDeleteChannel.subscribe((games: Game[])=>{
    });

    this.localStorageService.storageChangeChannel.subscribe(() => {
      this.games = this.localStorageService.getBackupFromStorage().games
    })
  }

  ngOnInit(): void {
    this.gamesService.gamesLoadChannel.next();
  }

  ngOnDestroy() {
    this.gamesLoadChannelSubscription.unsubscribe();
    this.gameSaveChannelSubscription.unsubscribe();
  }
}
