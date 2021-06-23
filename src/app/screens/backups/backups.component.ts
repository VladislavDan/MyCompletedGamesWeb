import {Component, OnDestroy} from '@angular/core';
import {BackupsService} from './backups.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'BackupsComponent',
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.compnent.scss']
})
export class BackupsComponent implements OnDestroy{

  private loginChannelSubscription: Subscription;

  constructor(private backupsService:BackupsService) {
    this.loginChannelSubscription = this.backupsService.loginChannel.subscribe(()=>{
      console.log('load')
    }, (error)=>{
      console.log(error)
    });
  }

  onGoogleLogin(): void {
    this.backupsService.loginChannel.next();
  }

  ngOnDestroy(): void {
    this.loginChannelSubscription.unsubscribe();
  }
}
