import {Backup} from '../../types/Backup';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LocalStorageService {

  public storageChangeChannel: Subject<void> = new Subject();

  private gamesLocalStorageID = 'games-local-storage';
  private authTokenLocalStorageID = 'auth-token';

  constructor() {
  }

  public getBackupFromStorage() : Backup {
    return JSON.parse(localStorage.getItem(this.gamesLocalStorageID) as string) as Backup;
  }

  public setBackupToStorage(backup: Backup) {
    localStorage.setItem(this.gamesLocalStorageID, JSON.stringify(backup, null, 4));
    this.storageChangeChannel.next();
  }

  public getAuthToken() {
    return localStorage.getItem(this.authTokenLocalStorageID) as string
  }

  public setAuthToken(authToken: string) {
    localStorage.setItem(this.authTokenLocalStorageID, authToken);
    this.storageChangeChannel.next();
  }
}
