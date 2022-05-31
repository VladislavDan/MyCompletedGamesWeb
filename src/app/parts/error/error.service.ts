import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ErrorService {

  public errorChannel = new Subject<string>();

  constructor() {
  }

}
