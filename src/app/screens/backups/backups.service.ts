import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {from, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {ajax} from 'rxjs/ajax';
import {Backup} from '../../types/Backup';
import {routs} from '../../common/navigate.constants';
import {Router} from '@angular/router';

@Injectable()
export class BackupsService {

  public backupsNameLoadChannel = new Subject<any>();
  public backupLoadChannel = new Subject<void>();
  public backupUploadChannel = new Subject<void>();
  public backupDeleteChannel = new Subject<void>();

  private backupFileName = 'my-completed-games.json';
  private backupFolderName = 'my-completed-games';
  private gamesLocalStorageID = 'games-local-storage';
  private googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
  private searchFilesURI = this.googleDriveFilesAPI + '?q=name%20contains%20';

  constructor(private socialAuthService: SocialAuthService, private errorService: ErrorService) {

    this.backupsNameLoadChannel = new Subject<any>().pipe(
      switchMap( (authToken ): Observable<string[]> => this.getBackupFiles(authToken)),
      catchError((error:Error) => {
        errorService.errorChannel.next('Cannot load files');
        return throwError(error);
      })
    ) as Subject<any>;
  }

  public getBackupFiles(token: string): Observable<string[]> {
    return ajax(
      {
        url: `${this.searchFilesURI}'${this.backupFileName}'`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        method: 'GET'
      }
    ).pipe(
      map((result) => {
        console.log(result)
        return result.response.files;
      })
    ) as Observable<string[]>;
  }

  public getBackupFolder(token: string): Observable<any> {
    return ajax(
      {
        url: this.searchFilesURI + this.backupFolderName,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        method: 'GET'
      }
    ).pipe(
      map((result) => {
        return result.response.files;
      })
    );
  }

  public deleteBackupFile(token: string, fileId: string): Observable<any> {
    return ajax(
      {
        url: this.googleDriveFilesAPI + fileId,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      }
    );
  }

  public createNewBackupFile(token: string, id: string): Observable<any> {
    return ajax(
      {
        url: this.googleDriveFilesAPI,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: {
          parents: [id],
          name: this.backupFileName
        },
        method: 'POST'
      }
    ).pipe(
      map((result) => {
        return result.response.id;
      })
    );
  }

  public createBackupFolder(token: string): Observable<any> {
    return ajax(
      {
        url: this.googleDriveFilesAPI,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: {
          name: this.backupFolderName,
          mimeType: 'application/vnd.google-apps.folder'
        },
        method: 'POST'
      }
    ).pipe(
      map((result) => {
        return result.response.id;
      })
    );
  }

  public loadBackupFile(token: string, fileId: string): Observable<any> {
    return ajax(
      {
        url: this.googleDriveFilesAPI,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        method: 'GET'
      }
    ).pipe(
      map((result) => {
        return result.response;
      })
    );
  }

  public uploadBackupFile(token: string, backup: Backup, fileId: string): Observable<any> {
    return ajax(
      {
        url: this.googleDriveFilesAPI + fileId,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(backup, null, 4),
        responseType: 'text',
        method: 'PATCH'
      }
    ).pipe(
      map((result) => {
        return fileId;
      })
    );
  }

  public getBackupFromStorage() : Backup {
    return JSON.parse(localStorage.getItem(this.gamesLocalStorageID) as string) as Backup;
  }

  public setBackupToStorage(backup: Backup) {
    localStorage.setItem(this.gamesLocalStorageID, JSON.stringify(backup, null, 4));
  }

}

