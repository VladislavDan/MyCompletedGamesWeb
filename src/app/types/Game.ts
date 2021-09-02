export interface Game {
  id: string;
  name: string;
  console: string;
  isTogether: boolean;
  image?: string
  status: Status
}

export enum Status {
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
  TODO = 'To Do'
}