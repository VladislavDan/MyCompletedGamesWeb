import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {from, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ErrorService} from '../error/error.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Game} from '../../types/Game';
import {Filter} from '../../types/Filter';

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
      map((filter: Filter): Game[] => {

        let filteredGames = this.localStorageService.getBackupFromStorage().games;

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
          const isTogether = filter.together === 'true'

          filteredGames = filteredGames.filter((game: Game) => {
            return game.isTogether === isTogether;
          });
        }

        return filteredGames
      }),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot load files');
        return throwError(error);
      })
    ) as Subject<any>;

    this.gameSaveChannel = new Subject<any>().pipe(
      map((game: Game): Game[] => {
        const games: Game[] = this.localStorageService.getBackupFromStorage().games;

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
        this.localStorageService.setBackupToStorage({
          dateChanged: new Date().toString(),
          games: games
        });

        return games
      }),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot load files');
        return throwError(error);
      })
    ) as Subject<any>;

    this.gameDeleteChannel = new Subject<any>().pipe(
      map((game: Game): Game[] => {
        let games: Game[] = this.localStorageService.getBackupFromStorage().games;
        games = games.filter((filteredGame: Game) => {
          return filteredGame.id !== game.id
        });
        this.localStorageService.setBackupToStorage({
          dateChanged: new Date().toString(),
          games: games
        });

        return games
      }),
      catchError((error: Error) => {
        errorService.errorChannel.next('Cannot load files');
        return throwError(error);
      })
    ) as Subject<any>;
  }
}
