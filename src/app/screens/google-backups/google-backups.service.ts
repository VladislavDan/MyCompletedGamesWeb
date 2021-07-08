import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Backup} from '../../types/Backup';
import {GoogleDriveFile} from '../../types/GoogleDriveFile';

@Injectable()
export class GoogleBackupsService {

  public backupsNameLoadChannel;
  public backupLoadChannel;
  public backupUploadChannel: any;
  public backupDeleteChannel: any;

  private backupFileName = 'my-completed-games.json';
  private backupFolderName = 'my-completed-games';
  private googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
  private googleDriveUploadAPI = "https://www.googleapis.com/upload/drive/v3/files/";
  private searchFilesURI = this.googleDriveFilesAPI + '?fields=files(id,createdTime)&q=name%20contains%20';
  private searchFolderURI = this.googleDriveFilesAPI + '?q=name%20contains%20';
  private getFilesAdditionalPartURI = '?alt=media';
  private googleDriveFolderType = 'application/vnd.google-apps.folder';

  constructor(
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {

    this.backupsNameLoadChannel = new Subject<any>().pipe(
      switchMap( (): Observable<string[]> => this.getBackupFiles(localStorageService.getAuthToken())),
      catchError((error:Error) => {
        errorService.errorChannel.next('Cannot load backups files names');
        return throwError(error);
      })
    ) as Subject<any>;

    this.backupLoadChannel = new Subject<any>().pipe(
      switchMap((backupID: string): Observable<any> => this.loadBackupFile(
        localStorageService.getAuthToken(),
        backupID
      )),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot load backup file');
        return throwError(error);
      })
    ) as Subject<any>;

    this.backupUploadChannel = new Subject().pipe(
      switchMap(() => this.createNewBackup()),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot upload backup files');
        return throwError(error);
      })
    );

    this.backupDeleteChannel = new Subject<any>().pipe(
      switchMap((fileID: string) => this.deleteBackupFile(this.localStorageService.getAuthToken(), fileID)),
      tap(() => {
        this.backupsNameLoadChannel.next()
      }),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot delete backup file');
        return throwError(error);
      })
    );
  }

  public createNewBackup() {
    return this.getBackupFolder(this.localStorageService.getAuthToken())
      .pipe(
        switchMap((folders: GoogleDriveFile[]) => {
          if (folders) {
            let foundedFolder = folders.find((file) => {
              return file.mimeType === this.googleDriveFolderType
            });
            if (foundedFolder) {
              return of(foundedFolder.id);
            } else {
              return this.createBackupFolder(this.localStorageService.getAuthToken());
            }
          } else {
            return this.createBackupFolder(this.localStorageService.getAuthToken());
          }
        }),
        switchMap((folderId) => {
          return this.createNewBackupFile(
            this.localStorageService.getAuthToken(),
            folderId
          );
        }),
        switchMap( (fileId: string)=> {
          return this.uploadBackupFile(
            this.localStorageService.getAuthToken(),
            this.localStorageService.getBackupFromStorage(),
            fileId
          )
        }),
        tap(() => {
          return this.backupsNameLoadChannel.next();
        })
      );
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
        url: `${this.searchFolderURI}'${this.backupFolderName}'`,
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
        url: this.googleDriveUploadAPI + fileId,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(backup, null, 4),
        responseType: 'text',
        method: 'PATCH'
      }
    ).pipe(
      map(() => {
        return fileId;
      })
    );
  }
}

