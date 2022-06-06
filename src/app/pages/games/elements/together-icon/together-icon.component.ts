import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'together-icon',
  templateUrl: './together-icon.component.html',
  styleUrls: ['./together-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogetherIconComponent {

  @Input()
  public isTogether: boolean = false;
}
