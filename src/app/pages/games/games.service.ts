import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {iif, of, throwError} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {ErrorService} from '../../parts/error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {IGame} from '../../common/types/IGame';
import {Filter} from '../../common/types/Filter';
import {IBackup} from '../../common/types/IBackup';
import {Channel} from '../../../../MyTools/channel-conception/Channel';
import {getFilteredGames} from './logics/getFilteredGames';
import {combineGamesByStatus} from './logics/combineGamesByStatus';
import {ICombinedGamesObject} from '../../common/types/ICombinedGamesObject';

@Injectable()
export class GamesService {

  public gamesLoadChannel: Channel<Filter | null, ICombinedGamesObject>;

  constructor(
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {

    const filteredGames$ = (filter: Filter | null) => of('').pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage()),
      map((backup: IBackup) => getFilteredGames(backup, filter)),
      map((games: Array<IGame>) => combineGamesByStatus(games))
    )

    const gamesWithoutFiltering$ = of('').pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage()),
      map((backup: IBackup) => combineGamesByStatus(backup.games))
    )

    this.gamesLoadChannel = new Channel<Filter | null, ICombinedGamesObject>(
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
