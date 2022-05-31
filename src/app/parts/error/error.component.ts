import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {ErrorService} from './error.service';
import {ErrorDialog} from './error.dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ErrorComponent',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {

  private errorChannelSubscription: Subscription;

  constructor(private errorService: ErrorService, public dialog: MatDialog) {
    this.errorChannelSubscription = errorService.errorChannel.subscribe((errorMessage: string) => {
      this.dialog.open(ErrorDialog, {
        data: {
          errorMessage: errorMessage
        },
        width: '200px'
      });
    })
  }

  ngOnDestroy() {
    this.errorChannelSubscription.unsubscribe();
  }
}
