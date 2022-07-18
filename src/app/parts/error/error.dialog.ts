import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {DialogData} from '../../common/types/DialogData';

@Component({
  selector: 'ErrorDialog',
  templateUrl: './error.dialog.html',
  styleUrls: ['./error.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
