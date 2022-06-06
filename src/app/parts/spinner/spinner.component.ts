import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {SpinnerService} from './spinner.service';
import {InitializationDataService} from '../../common/services/initialization-data.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy {

  public spinnerCounter: number = 0;

  private spinnerCounterChannelSubscription: Subscription;

  constructor(private spinnerService: SpinnerService, public initializationDataService: InitializationDataService) {
    this.spinnerCounterChannelSubscription = spinnerService.spinnerCounterChannel.subscribe(
      (spinnerCounter: number) => {
        this.spinnerCounter = spinnerCounter;
      }
    )
  }

  ngOnDestroy() {
  }
}
