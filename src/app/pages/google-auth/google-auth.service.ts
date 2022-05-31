import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {from, Observable, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ErrorService} from '../../parts/error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';

@Injectable()
export class GoogleAuthService {

  public loginChannel: Subject<string>;


  constructor(
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {

    this.loginChannel = new Subject<string>().pipe(
      switchMap((): Observable<SocialUser> => from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))),
      map((socialUser) => socialUser.authToken),
      tap((authToken: string) => {
        localStorageService.setAuthToken(authToken)
      }),
      catchError((error:Error) => {
        errorService.errorChannel.next('Cannot connect to Google drive');
        return throwError(error);
      })
    ) as Subject<string>;
  }
}
