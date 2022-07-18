import {Status} from './IGame';

export interface Filter {
  searchText: string;
  together: string;
  console: string;
  status: Status | 'none'
}
