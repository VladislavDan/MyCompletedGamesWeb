import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {routs} from '../navigate.constants';

@Injectable()
export class GoogleAuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.socialAuthService.authState.pipe(
      map((socialUser: SocialUser) => !!socialUser),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate([routs.googleAuth]);
        }
      }),
      catchError((error) => {
        console.log(error);
        return throwError(null);
      })
    );
  }
}
