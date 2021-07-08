import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {DialogData} from '../../types/DialogData';
import {ConfirmService} from './confirm.service';

@Component({
  selector: 'ConfirmDialog',
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
    this.confirmService.confirmationResultChannel.next(false);
  }

  onClickYes() {
    this.confirmService.confirmationResultChannel.next(true);
  }
}
