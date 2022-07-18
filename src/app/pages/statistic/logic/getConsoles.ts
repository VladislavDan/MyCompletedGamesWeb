import {IGame} from "../../../common/types/IGame";

export const getConsoles = (games: IGame[]): string[] => {
  const onlyConsoles = games.map((game: IGame) => {
    return game.console;
  });
  return [...new Set<string>(onlyConsoles)]
}
