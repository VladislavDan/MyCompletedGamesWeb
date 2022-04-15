import {Game, Status} from "../../../types/Game";

export const combineGamesByStatus = (games: Game[]): Array<Game[]> => {
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
