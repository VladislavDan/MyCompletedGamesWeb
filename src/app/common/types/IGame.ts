import {EStatus} from './EStatus';

export interface IGame {
  id: number;
  name: string;
  console: string;
  isTogether: boolean;
  image?: string
  status: EStatus
  finishDate?: number | null
}
