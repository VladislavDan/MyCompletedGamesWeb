import {IGame} from "./IGame";
import {ISetup} from "./ISetup";

export interface IBackup {
  dateChanged: string;
  games: Array<IGame>;
  setup?: ISetup;
}
