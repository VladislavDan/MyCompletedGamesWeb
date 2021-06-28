import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {from, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';

@Injectable()
export class GoogleAuthService {

  public loginChannel: Subject<string>;


  constructor(private socialAuthService: SocialAuthService, private errorService: ErrorService) {

    this.loginChannel = new Subject<string>().pipe(
      switchMap((): Observable<SocialUser> => from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))),
      map((socialUser) => socialUser.authToken),
      catchError((error:Error) => {
        errorService.errorChannel.next('Cannot connect to Google drive');
        return throwError(error);
      })
    ) as Subject<string>;
  }
}
