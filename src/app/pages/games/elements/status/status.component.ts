import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'status-component',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {

  @Input()
  public status: string = '';
}
