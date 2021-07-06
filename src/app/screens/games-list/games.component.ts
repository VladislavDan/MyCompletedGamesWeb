import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GamesService} from './games.service';
import {Game} from '../../types/Game';
import {LocalStorageService} from '../../common/services/local-storage.service';

@Component({
  selector: 'GamesComponent',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent implements OnInit, OnDestroy {

  public games: Game[] = [];

  private gamesLoadChannelSubscription: Subscription;
  private gameSaveChannelSubscription: Subscription;

  constructor(private gamesService: GamesService, private localStorageService: LocalStorageService) {

    this.gamesLoadChannelSubscription = gamesService.gamesLoadChannel.subscribe((games)=>{
      this.games = games;
    });

    this.gameSaveChannelSubscription = gamesService.gameSaveChannel.subscribe(()=>{
    });

    this.gameSaveChannelSubscription = gamesService.gameDeleteChannel.subscribe(()=>{
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
