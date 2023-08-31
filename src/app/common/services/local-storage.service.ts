import {Injectable} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';

import {IBackup} from '../types/IBackup';
import {IGame} from '../types/IGame';
import {DataBaseService} from './data-base-service';
import {EStatus} from '../types/EStatus';

@Injectable()
export class LocalStorageService {

  private gamesLocalStorageID = 'games-local-storage';
  private authTokenLocalStorageID = 'auth-token';

  constructor(private dataBaseService: DataBaseService) {
  }

  public getBackupFromStorage() : Observable<IBackup> {
    return from((async () => {
      const backup = await this.dataBaseService.get<IBackup>(this.gamesLocalStorageID);
      if(backup) {
        return backup;
      } else {
        return {
          dateChanged: new Date().toString(),
          games: []
        }
      }
    })());
  }

  public setBackupToStorage(backup: IBackup): Observable<IBackup> {
    return from((async () => {
      backup.games.forEach((game: IGame) => {
        if(!game.status) {
          game.status = EStatus.DONE
        }
      });
      await this.dataBaseService.set<IBackup>(this.gamesLocalStorageID, backup);
      return backup;
    })());
  }

  public getAuthToken(): Observable<string> {
    return from((async () => {
      const authToken = await this.dataBaseService.get<IBackup>(this.authTokenLocalStorageID);
      if(authToken) {
        return authToken;
      } else {
       throwError('Auth token is empty')
      }
    })());
  }

  public setAuthToken(authToken: string): Observable<string> {
    return from((async () => {
      await this.dataBaseService.set<string>(this.authTokenLocalStorageID, authToken);
      return authToken;
    })());
  }
}
