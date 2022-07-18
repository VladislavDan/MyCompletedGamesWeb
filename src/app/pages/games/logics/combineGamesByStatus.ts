import {IGame, Status} from "../../../common/types/IGame";

export const combineGamesByStatus = (games: IGame[]): Array<IGame[]> => {
  const inProgressGames = games.filter((game: IGame) => {
    return game.status === Status.IN_PROGRESS;
  });

  const doneGames = games.filter((game: IGame) => {
    return game.status === Status.DONE;
  });

  const todoGames = games.filter((game: IGame) => {
    return game.status === Status.TODO;
  });

  return [todoGames || [], inProgressGames || [], doneGames || []];
}
