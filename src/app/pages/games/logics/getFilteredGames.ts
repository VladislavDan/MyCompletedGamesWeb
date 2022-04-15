import {Backup} from "../../../types/Backup";
import {Filter} from "../../../types/Filter";
import {Game} from "../../../types/Game";

export const getFilteredGames = (backup: Backup, filter: Filter | null): Game[] => {

  let filteredGames = backup.games;

  if(!filter) {
    return filteredGames
  }

  if (!!filter.searchText) {
    filteredGames = filteredGames.filter((game: Game) => {
      return game.name.toLowerCase().indexOf(filter.searchText.toLowerCase()) !== -1
    });
  }

  if (filter.console != 'none') {
    filteredGames = filteredGames.filter((game: Game) => {
      return game.console === filter.console;
    });
  }

  if (filter.status != 'none') {
    filteredGames = filteredGames.filter((game: Game) => {
      return game.status === filter.status;
    });
  }

  if (filter.together != 'none') {
    const isTogether = filter.together === 'true';

    filteredGames = filteredGames.filter((game: Game) => {
      return game.isTogether === isTogether;
    });
  }

  return filteredGames;
}
