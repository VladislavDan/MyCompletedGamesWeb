import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ErrorService} from '../../parts/error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {IGame} from '../../types/IGame';
import {IBackup} from '../../types/IBackup';
import {Channel} from "../../../../MyTools/channel-conception/Channel";

@Injectable()
export class GameEditorService {

  public gameSaveChannel: Channel<IGame, IBackup>;
  public gameDeleteChannel: Channel<number, IBackup>;
  public gameByIDChannel: Channel<number, IGame | undefined>;

  constructor(
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService,
  ) {

    this.gameSaveChannel = new Channel((game: IGame) => of(game).pipe(
      switchMap((game) => this.saveGame(game)),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot save game');
        return throwError(error);
      })
    ));

    this.gameDeleteChannel = new Channel((gameID: number) => of(gameID).pipe(
      switchMap((gameID: number) => this.deleteGame(gameID)),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot delete game');
        return throwError(error);
      })
    ));

    this.gameByIDChannel = new Channel((gameID: number) => of(gameID).pipe(
      switchMap((gameID: number) => {
        return this.getGameByID(gameID)
      }),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot get file by Id');
        return throwError(error);
      })
    ));
  }

  getGameByID(gameID: number) {
    return of('').pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage()),
      map((backup: IBackup) => {
        return backup.games.find((game: IGame) => game.id === gameID);
      })
    )
  }

  saveGame(game: IGame): Observable<IBackup> {
    return of('').pipe(
      switchMap(() => this.localStorageService.getBackupFromStorage()),
      map((backup: IBackup): IGame[] => {
        const games: IGame[] = backup.games;

        if (!game.id) {
          game.id = new Date().getTime();
          games.push(game);
        } else {
          const index = games.findIndex((item: IGame) => {
            return item.id === game.id;
          });
          games[index] = game;
        }


        games.sort((firstGame: IGame, secondGame: IGame) => {
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
      switchMap((games: IGame[])=> this.localStorageService.setBackupToStorage({
        dateChanged: new Date().toString(),
        games: games
      }))
    )
  }

  deleteGame(gameID: number): Observable<IBackup> {
    return this.localStorageService.getBackupFromStorage().pipe(
      map((backup: IBackup): IGame[] => {
        let games: IGame[] = backup.games;
        games = games.filter((filteredGame: IGame) => {
          return filteredGame.id !== gameID
        });
        return games
      }),
      switchMap((games: IGame[])=> this.localStorageService.setBackupToStorage({
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
