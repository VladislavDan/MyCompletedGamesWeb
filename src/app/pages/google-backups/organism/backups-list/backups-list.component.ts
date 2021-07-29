import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {GoogleDriveFile} from '../../../../types/GoogleDriveFile';
import {ConfirmService} from '../../../confirm/confirm.service';
import {GoogleBackupsService} from '../../google-backups.service';

@Component({
  selector: 'BackupsListComponent',
  templateUrl: './backups-list.component.html',
  styleUrls: ['./backups-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackupsListComponent {

  @Input()
  public backups: GoogleDriveFile[] = [];

  constructor(
    private backupsService: GoogleBackupsService,
    private confirmService: ConfirmService
  ) {

  }

  onLoadBackup(backupID: string) {
    this.confirmService.openConfirmDialog(
      'Do you want to make this action it can erase your unsaved games?'
    ).subscribe(() => {
      if(this.confirmService.isConfirm){
        this.backupsService.backupLoadChannel.next(backupID)
      }
    });
  }

  onUploadBackup() {
     this.backupsService.backupUploadChannel.next();
  }

  onDeleteBackup(backupID: string) {
    this.confirmService.openConfirmDialog(
      'Do you want to make this action you can lose your backup?'
    ).subscribe(() => {
      if(this.confirmService.isConfirm){
        this.backupsService.backupDeleteChannel.next(backupID)
      }
    });
  }
}
