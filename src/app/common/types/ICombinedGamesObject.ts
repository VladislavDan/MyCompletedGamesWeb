import {IGame} from './IGame';
import {EStatus} from './EStatus';

export type ICombinedGamesObject = {
  [key in EStatus]: IGame[]
}
