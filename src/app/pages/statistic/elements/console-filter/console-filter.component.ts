import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {IConsoleShowingStatus} from "../../../../types/IConsoleShowingStatus";

@Component({
  selector: 'console-filter',
  templateUrl: 'console-filter.component.html',
  styleUrls:['console-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleFilterComponent {
  @Input()
  public consoles: IConsoleShowingStatus[] = []
  @Output()
  public checkedConsole: EventEmitter<IConsoleShowingStatus> = new EventEmitter()

  onChange = (consoleName: string) => (event: MatCheckboxChange) => {
    this.checkedConsole.emit({
      isShow: event.checked,
      consoleName
    })
  }
}
