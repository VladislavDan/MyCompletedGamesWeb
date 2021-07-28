import {Status} from './Game';

export interface Filter {
  searchText: string;
  together: string;
  console: string;
  status: Status | 'none'
}
