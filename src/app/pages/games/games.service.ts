import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Game, Status} from '../../types/Game';
import {Filter} from '../../types/Filter';
import {Backup} from '../../types/Backup';

@Injectable()
export class GamesService {

  public gamesLoadChannel;


  constructor(
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {

    this.gamesLoadChannel = new Subject<any>().pipe(
      switchMap((filter: Filter) => this.getFilteredGames(filter)),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot load games');
        return throwError(error);
      })
    ) as Subject<any>;
  }

  getFilteredGames(filter: Filter): Observable<Array<Game[]>> {
    return this.localStorageService.getBackupFromStorage().pipe(
      map((backup: Backup): Array<Game[]> => {

        let filteredGames = backup.games;

        if (!filter) {
          return this.combineGamesByStatus(filteredGames);
        }

        if (!!filter.searchText) {
          filteredGames = filteredGames.filter((game: Game) => {
            return game.name.toLowerCase().indexOf(filter.searchText.toLowerCase()) !== -1
          });
        }

        if (filter.console != 'none') {
          filteredGames = filteredGames.filter((game: Game) => {
            return game.console === filter.console;
          });
        }

        if (filter.status != 'none') {
          filteredGames = filteredGames.filter((game: Game) => {
            return game.status === filter.status;
          });
        }

        if (filter.together != 'none') {
          const isTogether = filter.together === 'true';

          filteredGames = filteredGames.filter((game: Game) => {
            return game.isTogether === isTogether;
          });
        }

        return this.combineGamesByStatus(filteredGames);
      })
    )
  }

  combineGamesByStatus(games: Game[]): Array<Game[]> {
    const inProgressGames = games.filter((game: Game) => {
      return game.status === Status.IN_PROGRESS;
    });

    const doneGames = games.filter((game: Game) => {
      return game.status === Status.DONE;
    });

    const todoGames = games.filter((game: Game) => {
      return game.status === Status.TODO;
    });

    return [todoGames || [], inProgressGames || [], doneGames || []];
  }
}
