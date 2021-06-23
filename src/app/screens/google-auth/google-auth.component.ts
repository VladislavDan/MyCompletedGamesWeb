import {Component, OnDestroy} from '@angular/core';
import {GoogleAuthService} from './google-auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'GoogleAuthComponent',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnDestroy {

  private loginChannelSubscription: Subscription;

  constructor(private backupsService: GoogleAuthService) {
    this.loginChannelSubscription = this.backupsService.loginChannel.subscribe(() => {
      console.log('load')
    }, (error) => {
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
