import {Backup} from '../../types/Backup';
import {Injectable} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {Game, Status} from '../../types/Game';

@Injectable()
export class LocalStorageService {

  public storageChangeChannel: Subject<Backup> = new Subject();

  private gamesLocalStorageID = 'games-local-storage';
  private authTokenLocalStorageID = 'auth-token';

  constructor() {
  }

  public getBackupFromStorage() : Observable<Backup> {
    return from(new Promise<Backup>((resolve) => {
      const backup = localStorage.getItem(this.gamesLocalStorageID);
      if(backup) {
        resolve(JSON.parse(backup));
      } else {
        resolve({
          dateChanged: new Date().toString(),
          games: []
        })
      }
    }));
  }

  public setBackupToStorage(backup: Backup): Observable<Backup> {
    return from(new Promise<Backup>((resolve) => {
      backup.games.forEach((game: Game) => {
        if(!game.status) {
          game.status = Status.DONE
        }
      });
      this.storageChangeChannel.next(backup);
      localStorage.setItem(this.gamesLocalStorageID, JSON.stringify(backup, null, 4));
      resolve(backup);
    }));
  }

  public getAuthToken(): Observable<string> {
    return from(new Promise<string>((resolve, reject) => {
      const authToken = localStorage.getItem(this.authTokenLocalStorageID);
      if(authToken) {
        resolve(authToken);
      } else {
        reject('Auth token is empty')
      }
    }));
  }

  public setAuthToken(authToken: string): Observable<string> {
    return from(new Promise<string>((resolve) => {
      localStorage.setItem(this.authTokenLocalStorageID, authToken);
      resolve(authToken);
    }));
  }
}
