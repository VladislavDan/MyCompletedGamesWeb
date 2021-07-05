import { Injectable } from '@angular/core';

import {Game} from '../../types/Game';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class InitializationDataService {

  public allConsolesName: string[] = [];

  constructor(private localStorageService: LocalStorageService) {

    this.localStorageService.getBackupFromStorage().games.forEach((game: Game) => {
      if(!this.allConsolesName.includes(game.console)) {
        this.allConsolesName.push(game.console)
      }
    });

    localStorageService.storageChangeChannel.subscribe(() => {
      this.localStorageService.getBackupFromStorage().games.forEach((game: Game) => {
        if(!this.allConsolesName.includes(game.console)) {
          this.allConsolesName.push(game.console)
        }
      });
    });
  }
}
