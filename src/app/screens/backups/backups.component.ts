import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackupsService} from './backups.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {routs} from '../../common/navigate.constants';

@Component({
  selector: 'BackupsComponen',
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.component.scss']
})
export class BackupsComponent implements OnInit, OnDestroy {

  public backups: any[] = [];

  private backupsNameLoadChannelSubscription: Subscription;

  constructor(
    private backupsService: BackupsService
  ) {
    this.backupsNameLoadChannelSubscription = backupsService.backupsNameLoadChannel.subscribe((backups: string[])=>{
      backups.forEach((backup: any)=>{
        this.backups.push(backup)
      })
    });

    this.backupsService.backupLoadChannel.subscribe(()=>{
    })
  }

  ngOnInit(): void {
    this.backupsService.backupsNameLoadChannel.next();
  }

  ngOnDestroy() {
    this.backupsNameLoadChannelSubscription.unsubscribe();
  }
}
