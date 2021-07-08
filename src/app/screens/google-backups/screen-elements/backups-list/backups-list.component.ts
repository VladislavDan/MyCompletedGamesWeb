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
    this.confirmService.confirmationResultChannel.subscribe((confirmationResult: boolean) => {
      if(confirmationResult){
        this.backupsService.backupLoadChannel.next(backupID)
      }
    });
    this.confirmService.openConfirmDialogChannel.next('Do you want to make this action it can erase your unsaved games?');
  }

  onUploadBackup() {
     this.backupsService.backupUploadChannel.next();
  }

  onDeleteBackup(backupID: string) {
    this.confirmService.confirmationResultChannel.subscribe((confirmationResult: boolean) => {
      if(confirmationResult){
        this.backupsService.backupDeleteChannel.next(backupID)
      }
    });
    this.confirmService.openConfirmDialogChannel.next('Do you want to make this action you can lose your backup?');
  }
}
