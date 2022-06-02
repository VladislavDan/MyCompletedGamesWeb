import {Game} from "./Game";
import {ISetup} from "./ISetup";

export interface IBackup {
  dateChanged: string;
  games: Array<Game>;
  setup?: ISetup;
}
