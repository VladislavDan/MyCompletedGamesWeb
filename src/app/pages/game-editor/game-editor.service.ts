import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Game} from '../../types/Game';
import {Backup} from '../../types/Backup';

@Injectable()
export class GameEditorService {

  public gameSaveChannel;
  public gameDeleteChannel;
  public gameByIDChannel;

  constructor(
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService,
  ) {

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

    this.gameByIDChannel = new Subject<any>().pipe(
      switchMap((gameID: string) => {
        return this.getGameByID(gameID)
      }),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot delete game');
        return throwError(error);
      })
    ) as Subject<any>;
  }

  getGameByID(gameID: string) {
    return of('').pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage()),
      map((backup: Backup) => {
        return backup.games.find((game: Game) => game.id = gameID)
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
