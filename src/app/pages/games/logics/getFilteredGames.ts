import {IBackup} from "../../../common/types/IBackup";
import {Filter} from "../../../common/types/Filter";
import {IGame} from "../../../common/types/IGame";

export const getFilteredGames = (backup: IBackup, filter: Filter | null): IGame[] => {

  let filteredGames = backup.games;

  if(!filter) {
    return filteredGames
  }

  if (!!filter.searchText) {
    filteredGames = filteredGames.filter((game: IGame) => {
      return game.name.toLowerCase().indexOf(filter.searchText.toLowerCase()) !== -1
    });
  }

  if (filter.console != 'none') {
    filteredGames = filteredGames.filter((game: IGame) => {
      return game.console === filter.console;
    });
  }

  if (filter.status != 'none') {
    filteredGames = filteredGames.filter((game: IGame) => {
      return game.status === filter.status;
    });
  }

  if (filter.together != 'none') {
    const isTogether = filter.together === 'true';

    filteredGames = filteredGames.filter((game: IGame) => {
      return game.isTogether === isTogether;
    });
  }

  return filteredGames;
}
