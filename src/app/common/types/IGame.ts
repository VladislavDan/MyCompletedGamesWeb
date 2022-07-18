export interface IGame {
  id: number;
  name: string;
  console: string;
  isTogether: boolean;
  image?: string
  status: Status
  finishDate?: number | null
}

export enum Status {
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
  TODO = 'To Do'
}
