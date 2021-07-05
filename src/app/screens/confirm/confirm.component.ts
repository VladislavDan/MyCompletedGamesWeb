import {Component, OnDestroy} from '@angular/core';

import {ConfirmService} from './confirm.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialog} from './confirm.dialog';

@Component({
  selector: 'ConfirmComponent',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnDestroy {

  constructor(private confirmService: ConfirmService, public dialog: MatDialog) {
    confirmService.openConfirmDialogChannel.subscribe((confirmMessage: string) => {
        this.dialog.open(ConfirmDialog, {data: {confirmMessage}});
    });
  }

  ngOnDestroy() {
  }
}
