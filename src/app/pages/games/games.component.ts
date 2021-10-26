import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GamesService} from './games.service';
import {Game} from '../../types/Game';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Backup} from '../../types/Backup';

@Component({
  selector: 'GamesComponent',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  public games: Array<Game[]> = [[], [], []];

  private gamesLoadChannelSubscription: Subscription;

  constructor(private gamesService: GamesService, private localStorageService: LocalStorageService) {

    this.gamesLoadChannelSubscription = gamesService.gamesLoadChannel.subscribe((games: Array<Game[]>)=>{
      this.games = games;
    });

    this.localStorageService.storageChangeChannel
      .subscribe(() => {
        this.gamesService.gamesLoadChannel.next();
      });
  }

  ngOnInit(): void {
    this.gamesService.gamesLoadChannel.next();
  }

  ngOnDestroy() {
    this.gamesLoadChannelSubscription.unsubscribe();
  }
}
