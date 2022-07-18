import {IGame} from "./IGame";
import {ISetup} from "./ISetup";

export interface IBackup {
  games: Array<IGame>;
  setup?: ISetup;
}
