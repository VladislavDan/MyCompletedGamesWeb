import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Game} from '../../types/Game';
import {Filter} from '../../types/Filter';
import {Backup} from '../../types/Backup';

@Injectable()
export class GamesService {

  public gamesLoadChannel;
  public gameSaveChannel;
  public gameDeleteChannel;


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

    this.gameSaveChannel = new Subject<any>().pipe(
      switchMap((game: Game) => this.saveGame(game)),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot save game');
        return throwError(error);
      })
    ) as Subject<any>;

    this.gameDeleteChannel = new Subject<any>().pipe(
      switchMap((game: Game) => this.deleteGame(game)),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot delete game');
        return throwError(error);
      })
    ) as Subject<any>;
  }

  getFilteredGames(filter: Filter): Observable<Game[]> {
    return this.localStorageService.getBackupFromStorage().pipe(
      map((backup: Backup): Game[] => {

        let filteredGames = backup.games;

        if (!filter) {
          return filteredGames
        }

        if(!!filter.searchText) {
          filteredGames = filteredGames.filter((game: Game) => {
            return game.name.toLowerCase().indexOf(filter.searchText.toLowerCase()) !== -1
          });
        }

        if(filter.console != 'none') {
          filteredGames = filteredGames.filter((game: Game) => {
            return game.console === filter.console;
          });
        }

        if(filter.together != 'none') {
          const isTogether = filter.together === 'true';

          filteredGames = filteredGames.filter((game: Game) => {
            return game.isTogether === isTogether;
          });
        }

        return filteredGames
      })
    )
  }

  saveGame(game: Game): Observable<Backup> {
    return of('').pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage()),
      map((backup: Backup): Game[] => {
        const games: Game[] = backup.games;

        if (!game.id) {
          game.id = new Date().getTime().toString();
          games.push(game);
        } else {
          const index = games.findIndex((item: Game) => {
            return item.id === game.id;
          });
          games[index] = game;
        }


        games.sort((firstGame: Game, secondGame: Game) => {
          if (firstGame.name < secondGame.name) {
            return -1;
          }
          if (firstGame.name > secondGame.name) {
            return 1;
          }
          return 0;
        });
        return games
      }),
      switchMap((games: Game[])=> this.localStorageService.setBackupToStorage({
        dateChanged: new Date().toString(),
        games: games
      }))
    )
  }

  deleteGame(game: Game): Observable<Backup> {
    return this.localStorageService.getBackupFromStorage().pipe(
      map((backup: Backup): Game[] => {
        let games: Game[] = backup.games;
        games = games.filter((filteredGame: Game) => {
          return filteredGame.id !== game.id
        });
        return games
      }),
      switchMap((games: Game[])=> this.localStorageService.setBackupToStorage({
        dateChanged: new Date().toString(),
        games: games
      })),
      catchError((error: Error) => {
        this.errorService.errorChannel.next('Cannot read local storage files');
        return throwError(error);
      })
    )
  }
}
