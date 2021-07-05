import {Component, OnDestroy} from '@angular/core';
import {GoogleAuthService} from './google-auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {routs} from '../../common/navigate.constants';

@Component({
  selector: 'GoogleAuthComponent',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnDestroy {

  private loginChannelSubscription: Subscription;

  constructor(private googleAuthService: GoogleAuthService, private router: Router) {
    this.loginChannelSubscription = this.googleAuthService.loginChannel.subscribe(this.openBackupsList);
  }

  ngOnDestroy(): void {
    this.loginChannelSubscription.unsubscribe();
  }

  onGoogleLogin(): void {
    if (this.loginChannelSubscription.closed) {
      this.loginChannelSubscription = this.googleAuthService.loginChannel.subscribe(this.openBackupsList);
    }

    this.googleAuthService.loginChannel.next();
  }

  openBackupsList = (token: string): void => {
    this.router.navigate([routs.backups]);
  }
}
