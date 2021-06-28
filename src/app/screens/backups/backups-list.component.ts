import {Component, Input} from '@angular/core';

@Component({
  selector: 'BackupsListComponent',
  templateUrl: './backups-list.component.html',
  styleUrls: ['./backups-list.component.scss']
})
export class BackupsListComponent {

  @Input()
  public backupsNames: string[] = [];

  constructor() {
  }
}
