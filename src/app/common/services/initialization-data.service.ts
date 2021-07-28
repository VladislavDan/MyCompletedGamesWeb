import {Injectable} from '@angular/core';

import {Game} from '../../types/Game';
import {LocalStorageService} from './local-storage.service';
import {switchMap} from 'rxjs/operators';
import {Backup} from '../../types/Backup';

@Injectable()
export class InitializationDataService {

  public allConsolesName: string[] = [];
  public countOfGames: number = 0;

  constructor(private localStorageService: LocalStorageService) {

    this.localStorageService.getBackupFromStorage().subscribe((backup: Backup) => {
      this.countOfGames = backup.games.length;
      backup.games.forEach((game: Game) => {
        if (!this.allConsolesName.includes(game.console)) {
          this.allConsolesName.push(game.console)
        }
      });
    });

    localStorageService.storageChangeChannel.pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage())
    ).subscribe((backup: Backup) => {
      backup.games.forEach((game: Game) => {
        if (!this.allConsolesName.includes(game.console)) {
          this.allConsolesName.push(game.console)
        }
      });
    });
  }
}
