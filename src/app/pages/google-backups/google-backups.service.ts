import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ErrorService} from '../../parts/error/error.service';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {IBackup} from '../../common/types/IBackup';
import {GoogleDriveFile} from '../../common/types/GoogleDriveFile';
import {SpinnerService} from '../../parts/spinner/spinner.service';

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
    private errorService: ErrorService,
    private spinnerService: SpinnerService
  ) {

    this.backupsNameLoadChannel = new Subject<any>().pipe(
      tap(() => spinnerService.spinnerCounterChannel.next(1)),
      switchMap(() => localStorageService.getAuthToken()),
      switchMap(
        (authToken: string): Observable<string[]> => this.getBackupFiles(authToken)
      ),
      tap(() => spinnerService.spinnerCounterChannel.next(-1)),
      catchError((error: Error) => {
        spinnerService.spinnerCounterChannel.next(-1);
        errorService.errorChannel.next('Cannot load backups files names');
        return throwError(error);
      })
    ) as Subject<any>;

    this.backupLoadChannel = new Subject<any>().pipe(
      tap(() => spinnerService.spinnerCounterChannel.next(1)),
      switchMap((backupID: string): Observable<any> => this.loadBackupFile(backupID)),
      tap(() => spinnerService.spinnerCounterChannel.next(-1)),
      catchError((error: Error) => {
        spinnerService.spinnerCounterChannel.next(-1);
        errorService.errorChannel.next('Cannot load backup file');
        return throwError(error);
      })
    ) as Subject<any>;

    this.backupUploadChannel = new Subject().pipe(
      tap(() => spinnerService.spinnerCounterChannel.next(1)),
      switchMap(() => localStorageService.getAuthToken()),
      switchMap((authToken: string) => this.createNewBackup(authToken)),
      tap(() => spinnerService.spinnerCounterChannel.next(-1)),
      catchError((error: Error) => {
        spinnerService.spinnerCounterChannel.next(-1);
        errorService.errorChannel.next('Cannot upload backup files');
        return throwError(error);
      })
    );

    this.backupDeleteChannel = new Subject<any>().pipe(
      tap(() => spinnerService.spinnerCounterChannel.next(1)),
      switchMap((fileID: string) => this.deleteBackupFile(fileID)),
      tap(() => {
        this.backupsNameLoadChannel.next()
      }),
      tap(() => spinnerService.spinnerCounterChannel.next(-1)),
      catchError((error: Error) => {
        spinnerService.spinnerCounterChannel.next(-1);
        errorService.errorChannel.next('Cannot delete backup file');
        return throwError(error);
      })
    );
  }

  public createNewBackup(authToken: string) {
    return this.getBackupFolder(authToken)
      .pipe(
        switchMap((folders: GoogleDriveFile[]) => {
          if (folders) {
            let foundedFolder = folders.find((file) => {
              return file.mimeType === this.googleDriveFolderType
            });
            if (foundedFolder) {
              return of(foundedFolder.id);
            } else {
              return this.createBackupFolder(authToken);
            }
          } else {
            return this.createBackupFolder(authToken);
          }
        }),
        switchMap((folderId) => {
          return this.createNewBackupFile(
            authToken,
            folderId
          );
        }),
        switchMap((fileId: string) => {
          return this.uploadBackupFile(
            authToken,
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

  public loadBackupFile(fileId: string): Observable<any> {
    return of('').pipe(
      switchMap(() => this.localStorageService.getAuthToken()),
      switchMap((authToken: string) => ajax(
        {
          url: this.googleDriveFilesAPI + fileId + this.getFilesAdditionalPartURI,
          headers: {
            "Authorization": "Bearer " + authToken
          },
          method: "GET"
        }
      )),
      tap((result: AjaxResponse) => {
        const backup: IBackup = result.response as IBackup
        backup.games = backup.games.map((game) => {
          game.id = Number(game.id);
          return game;
        })
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

  public deleteBackupFile(fileId: string): Observable<any> {
    return of('').pipe(
      switchMap(() => this.localStorageService.getAuthToken()),
      switchMap((authToken: string) => ajax(
        {
          url: this.googleDriveFilesAPI + fileId,
          headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
          },
          method: 'DELETE'
        }
      ))
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

  public uploadBackupFile(token: string, fileId: string): Observable<any> {
    return of('').pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage()),
      switchMap((backup: IBackup) => ajax(
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
      ))
    )
  }
}

