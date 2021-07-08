import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable()
export class ConfirmService {

  public openConfirmDialogChannel = new Subject<string>();
  public confirmationResultChannel;

  constructor() {
    this.confirmationResultChannel = new Subject<boolean>().pipe(
      take(1)
    ) as Subject<any>
  }
}
