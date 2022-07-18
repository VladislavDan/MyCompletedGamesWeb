import {IGame} from "../../../common/types/IGame";

export const filteredGamesByShowedConsoles = (
  games: IGame[],
  showedConsoles: string[]
): IGame[] => {
  return games.filter((game) => {
    return showedConsoles.indexOf(game.console) > -1;
  })
}
