import {Component, Input} from '@angular/core';

import {GoogleDriveFile} from '../../../../types/GoogleDriveFile';
import {BackupsService} from '../../backups.service';
import {ConfirmService} from '../../../confirm/confirm.service';

@Component({
  selector: 'BackupsListComponent',
  templateUrl: './backups-list.component.html',
  styleUrls: ['./backups-list.component.scss']
})
export class BackupsListComponent {

  @Input()
  public backups: GoogleDriveFile[] = [];

  constructor(
    private backupsService: BackupsService,
    private confirmService: ConfirmService
  ) {

  }

  onLoadBackup(backupID: string) {
    this.confirmService.confirmationResultChannel.subscribe((confirmationResult: boolean) => {
      if(confirmationResult){
        this.backupsService.backupLoadChannel.next(backupID)
      }
    });
    this.confirmService.openConfirmDialogChannel.next('Do you want to make this action it can erase your unsaved games?');
  }

  onUploadBackup() {

  }

  onDeleteBackup(backupID: string) {

  }
}
