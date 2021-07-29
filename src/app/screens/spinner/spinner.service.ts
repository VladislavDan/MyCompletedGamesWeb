import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class SpinnerService {

  public spinnerCounterChannel: Subject<number>;

  private spinnerCounter = 0;

  constructor() {
    this.spinnerCounterChannel = new Subject<number>().pipe(map((difference: number) => {
      if(this.spinnerCounter + difference >= 0) {
        this.spinnerCounter = this.spinnerCounter + difference;
      }
      return this.spinnerCounter;
    })) as Subject<number>
  }
}
