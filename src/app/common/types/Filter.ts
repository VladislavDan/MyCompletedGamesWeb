import {EStatus} from './EStatus';

export interface Filter {
  searchText: string;
  together: string;
  console: string;
  status: EStatus | 'none'
}
