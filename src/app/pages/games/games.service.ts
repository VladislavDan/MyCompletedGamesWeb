import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {iif, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Game, Status} from '../../types/Game';
import {Filter} from '../../types/Filter';
import {Backup} from '../../types/Backup';
import {Channel} from "../../common/Channel";
import {getFilteredGames} from "./logics/getFilteredGames";
import {combineGamesByStatus} from "./logics/combineGamesByStatus";

@Injectable()
export class GamesService {

  public gamesLoadChannel: Channel<Filter | null, Array<Game[]>>;

  constructor(
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {

    const filteredGames$ = (filter: Filter | null) => this.localStorageService.getBackupFromStorage().pipe(
      map((backup: Backup) => getFilteredGames(backup, filter)),
      map((games: Array<Game>) => combineGamesByStatus(games))
    )

    const gamesWithoutFiltering$ = this.localStorageService.getBackupFromStorage().pipe(
      map((backup: Backup) => combineGamesByStatus(backup.games))
    )

    this.gamesLoadChannel = new Channel<Filter | null, Array<Game[]>>(
      (filter: Filter | null) => of(filter).pipe(
        mergeMap(() =>
          iif(
            () => !!filter,
            filteredGames$(filter),
            gamesWithoutFiltering$,
          )
        ),
        catchError((error: Error) => {
          errorService.errorChannel.next('Cannot load games');
          return throwError(error);
        })
      )
    )
  }
}
