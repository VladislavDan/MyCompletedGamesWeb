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

  private subscription: Subscription = new Subscription();

  constructor(
    private backupsService: GoogleBackupsService
  ) {
    this.subscription.add(backupsService.backupsNameLoadChannel.subscribe((backups: string[])=>{
      this.backups = backups;
    }));

    this.subscription.add(this.backupsService.backupLoadChannel.subscribe());
    this.subscription.add(this.backupsService.backupDeleteChannel.subscribe());
    this.subscription.add(this.backupsService.backupUploadChannel.subscribe());
  }

  ngOnInit(): void {
    this.backupsService.backupsNameLoadChannel.next();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
