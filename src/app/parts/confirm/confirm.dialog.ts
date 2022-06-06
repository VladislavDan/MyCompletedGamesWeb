import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {DialogData} from '../../types/DialogData';
import {ConfirmService} from './confirm.service';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm.dialog.html',
  styleUrls: ['./confirm.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialog {

  public confirmMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private confirmService: ConfirmService) {
      this.confirmMessage = data.confirmMessage;
  }

  onClickNo() {
    this.confirmService.isConfirm = false;
  }

  onClickYes() {
    this.confirmService.isConfirm = true;
  }
}
