import {Game} from "./Game";

export interface Backup{
  dateChanged: string;
  games: Array<Game>;
}
