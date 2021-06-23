import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {from, Observable, Subject, throwError} from 'rxjs';
import {ErrorService} from '../error/error-service';
import {catchError, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class BackupsService {

  public loginChannel: Subject<SocialUser>;
  public backupLoadChannel = new Subject<void>();
  public backupDeleteChannel = new Subject<void>();

  constructor(private socialAuthService: SocialAuthService, private errorService: ErrorService) {

    this.loginChannel = new Subject<SocialUser>().pipe(
      switchMap((): Observable<SocialUser> => from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))),
      tap((socialUser: SocialUser): void => {
        console.log(socialUser)
      }),
      catchError((error:Error) => {
        errorService.errorChannel.next(error.message);
        return throwError(null);
      })
    ) as Subject<SocialUser>;
  }

}
