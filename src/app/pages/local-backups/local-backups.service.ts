import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';

@Injectable()
export class LocalBackupsService {

  public backupLoadChannel;

  constructor(
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {

    this.backupLoadChannel = new Subject<any>().pipe(
      tap((fileContent: string) => {
        this.localStorageService.setBackupToStorage({dateChanged: new Date().toString(), games: JSON.parse(fileContent)});
      }),
      catchError((error:Error) => {
        errorService.errorChannel.next('Cannot load file');
        return throwError(error);
      })
    ) as Subject<any>;
  }
}

