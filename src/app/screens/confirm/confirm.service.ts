import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ConfirmService {

  public openConfirmDialogChannel = new Subject<string>();
  public confirmationResultChannel = new Subject<boolean>();

  constructor() {
  }

}
