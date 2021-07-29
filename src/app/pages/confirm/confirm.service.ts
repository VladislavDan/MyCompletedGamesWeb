import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {ConfirmDialog} from './confirm.dialog';


@Injectable()
export class ConfirmService {

  public isConfirm: boolean = false;

  constructor(public dialog: MatDialog) {
  }

  openConfirmDialog(confirmMessage: string) {
    this.isConfirm = false;
    return this.dialog.open(ConfirmDialog, {data: {confirmMessage}}).afterClosed();
  };
}
