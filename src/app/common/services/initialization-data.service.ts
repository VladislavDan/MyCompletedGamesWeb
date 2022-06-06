import {Injectable} from '@angular/core';

import {IGame} from '../../types/IGame';
import {LocalStorageService} from './local-storage.service';
import {switchMap} from 'rxjs/operators';
import {IBackup} from '../../types/IBackup';

@Injectable()
export class InitializationDataService {

  public allConsolesName: string[] = [];
  public countOfGames: number = 0;
  public windowHeight = 0;
  public windowWidth = 0;

  constructor(private localStorageService: LocalStorageService) {

    this.localStorageService.getBackupFromStorage().subscribe((backup: IBackup) => {
      this.countOfGames = backup.games.length;
      backup.games.forEach((game: IGame) => {
        if (!this.allConsolesName.includes(game.console)) {
          this.allConsolesName.push(game.console)
        }
      });
    });

    localStorageService.storageChangeChannel.pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage())
    ).subscribe((backup: IBackup) => {
      backup.games.forEach((game: IGame) => {
        if (!this.allConsolesName.includes(game.console)) {
          this.allConsolesName.push(game.console)
        }
      });
    });
  }
}
