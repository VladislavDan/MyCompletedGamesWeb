import {Backup} from '../../types/Backup';
import {Injectable} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {Game, Status} from '../../types/Game';
import {DataBaseService} from "./data-base-service";

@Injectable()
export class LocalStorageService {

  public storageChangeChannel: Subject<Backup> = new Subject();

  private gamesLocalStorageID = 'games-local-storage';
  private authTokenLocalStorageID = 'auth-token';

  constructor(private dataBaseService: DataBaseService) {
  }

  public getBackupFromStorage() : Observable<Backup> {
    return from(new Promise<Backup>((resolve) => {
      const backup = this.dataBaseService.get<Backup>(this.gamesLocalStorageID);
      if(backup) {
        resolve(backup);
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
      this.dataBaseService.set<Backup>(this.gamesLocalStorageID, backup);
      this.storageChangeChannel.next(backup);
      resolve(backup);
    }));
  }

  public getAuthToken(): Observable<string> {
    return from(new Promise<string>((resolve, reject) => {
      const authToken = this.dataBaseService.get<string>(this.authTokenLocalStorageID);
      if(authToken) {
        resolve(authToken);
      } else {
        reject('Auth token is empty')
      }
    }));
  }

  public setAuthToken(authToken: string): Observable<string> {
    return from(new Promise<string>((resolve) => {
      this.dataBaseService.set<string>(this.authTokenLocalStorageID, authToken);
      resolve(authToken);
    }));
  }
}
