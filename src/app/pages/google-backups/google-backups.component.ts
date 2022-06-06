import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GoogleBackupsService} from './google-backups.service';

@Component({
  selector: 'google-backups',
  templateUrl: './google-backups.component.html',
  styleUrls: ['./google-backups.component.scss']
})
export class GoogleBackupsComponent implements OnInit, OnDestroy {

  public backups: any[] = [];

  private backupsNameLoadChannelSubscription: Subscription;

  constructor(
    private backupsService: GoogleBackupsService
  ) {
    this.backupsNameLoadChannelSubscription = backupsService.backupsNameLoadChannel.subscribe((backups: string[])=>{
      this.backups = backups;
    });

    this.backupsService.backupLoadChannel.subscribe(()=>{
    });

    this.backupsService.backupDeleteChannel.subscribe(()=>{
    });

    this.backupsService.backupUploadChannel.subscribe(()=>{
    });
  }

  ngOnInit(): void {
    this.backupsService.backupsNameLoadChannel.next();
  }

  ngOnDestroy() {
    this.backupsNameLoadChannelSubscription.unsubscribe();
  }
}
