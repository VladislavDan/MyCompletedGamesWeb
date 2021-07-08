import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import {LocalBackupsService} from './local-backups.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {ConfirmService} from '../confirm/confirm.service';
import {Backup} from '../../types/Backup';

@Component({
  selector: 'LocalBackupsComponent',
  templateUrl: './local-backups.component.html',
  styleUrls: ['./local-backups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalBackupsComponent implements OnDestroy {

  private backupLoadChannelSubscription: Subscription;

  @ViewChild('fileBuffer')
  public fileBuffer: ElementRef<HTMLLinkElement & {download: string}> | undefined;

  constructor(
    private backupsService: LocalBackupsService,
    private localStorageService: LocalStorageService,
    private confirmService: ConfirmService
  ) {

    this.backupLoadChannelSubscription = backupsService.backupLoadChannel.subscribe(() => {
    });
  }

  handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (readerEvent: any) => {
      const games: string = readerEvent.target.result;
      this.confirmService.openConfirmDialog(
        'Do you want to load backup. You lose all your current saves?'
      ).subscribe(()=>{
        if(this.confirmService.isConfirm) {
          this.backupsService.backupLoadChannel.next(games)
        }
      });
    };
    reader.readAsText(file);
  };

  onSaveFile() {
    this.localStorageService.getBackupFromStorage().subscribe((backup: Backup) => {
      const fileData : string = JSON.stringify(backup, null, 4);
      const blob = new Blob([fileData], {type: "octet/stream"});
      const url = window.URL.createObjectURL(blob);
      if(this.fileBuffer){
        this.fileBuffer.nativeElement.href = url;
        this.fileBuffer.nativeElement.download = 'My Completed Games.txt';
        this.fileBuffer.nativeElement.click();
      }
      window.URL.revokeObjectURL(url);
    });
  }

  ngOnDestroy() {
    this.backupLoadChannelSubscription.unsubscribe();
  }
}
