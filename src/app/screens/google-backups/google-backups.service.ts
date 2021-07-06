import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Backup} from '../../types/Backup';

@Injectable()
export class GoogleBackupsService {

  public backupsNameLoadChannel;
  public backupLoadChannel;

  private backupFileName = 'my-completed-games.json';
  private backupFolderName = 'my-completed-games';
  private googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
  private searchFilesURI = this.googleDriveFilesAPI + '?fields=files(id,createdTime)&q=name%20contains%20';
  private getFilesAdditionalPartURI = '?alt=media';

  constructor(
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {

    this.backupsNameLoadChannel = new Subject<any>().pipe(
      switchMap( (): Observable<string[]> => this.getBackupFiles(localStorageService.getAuthToken())),
      catchError((error:Error) => {
        errorService.errorChannel.next('Cannot load files');
        return throwError(error);
      })
    ) as Subject<any>;

    this.backupLoadChannel = new Subject<any>().pipe(
      switchMap((backupID: string): Observable<any> => this.loadBackupFile(
        localStorageService.getAuthToken(),
        backupID
      )),
      catchError((error: Error) => {
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

  public loadBackupFile(token: string, fileId: string): Observable<any> {
    return ajax(
      {
        url: this.googleDriveFilesAPI + fileId + this.getFilesAdditionalPartURI,
        headers: {
          "Authorization": "Bearer " + token
        },
        method: "GET"
      }
    ).pipe(
      tap((result: AjaxResponse) => {
        this.localStorageService.setBackupToStorage(result.response)
      })
    );
  }


  public getBackupFolder(token: string): Observable<any> {
    return ajax(
      {
        url: '',
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
}

