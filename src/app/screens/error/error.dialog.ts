import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {DialogData} from '../../types/DialogData';

@Component({
  selector: 'ErrorDialog',
  templateUrl: './error.dialog.html',
  styleUrls: ['./error.dialog.scss']
})
export class ErrorDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data)
  }
}
