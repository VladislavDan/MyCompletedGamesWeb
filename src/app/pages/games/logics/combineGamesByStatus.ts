import {IGame} from '../../../common/types/IGame';
import {ICombinedGamesObject} from '../../../common/types/ICombinedGamesObject';
import {EStatus} from '../../../common/types/EStatus';

export const combineGamesByStatus = (games: IGame[]): ICombinedGamesObject => {
  const inProgressGames = games.filter((game: IGame) => {
    return game.status === EStatus.IN_PROGRESS;
  });

  const doneGames = games.filter((game: IGame) => {
    return game.status === EStatus.DONE;
  });

  const todoGames = games.filter((game: IGame) => {
    return game.status === EStatus.TODO;
  });

  const abandoned = games.filter((game: IGame) => {
    return game.status === EStatus.ABANDONED;
  });

  return {
    [EStatus.TODO]: todoGames,
    [EStatus.IN_PROGRESS]: inProgressGames,
    [EStatus.DONE]: doneGames,
    [EStatus.ABANDONED]: abandoned
  };
}
