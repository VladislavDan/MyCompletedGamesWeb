import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'StatusComponent',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {

  @Input()
  public status: string = '';
}
