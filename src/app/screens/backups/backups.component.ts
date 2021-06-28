import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackupsService} from './backups.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'BackupsComponen',
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.component.scss']
})
export class BackupsComponent implements OnInit, OnDestroy {

  public backupsNames: string[] = [];

  private backupsNameLoadChannelSubscription: Subscription;

  constructor(private backupsListService: BackupsService, private route: ActivatedRoute,) {
    this.backupsNameLoadChannelSubscription = backupsListService.backupsNameLoadChannel.subscribe((backupsNames: string[])=>{
      backupsNames.forEach((name:any)=>{
        this.backupsNames.push(name.id)
      })
    })
  }

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.paramMap.get('token');
    this.backupsListService.backupsNameLoadChannel.next(token);
  }

  ngOnDestroy() {
    this.backupsNameLoadChannelSubscription.unsubscribe();
  }
}
