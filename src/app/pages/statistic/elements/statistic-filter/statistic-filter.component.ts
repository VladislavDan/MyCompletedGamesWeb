import {Component, EventEmitter, Input, Output} from "@angular/core";
import {IConsoleShowingStatus} from "../../../../common/types/IConsoleShowingStatus";

@Component({
  selector: 'statistic-filter',
  templateUrl: 'statistic-filter.html'
})
export class StatisticFilterComponent {

  @Output()
  public changeLimit = new EventEmitter<number>();
  @Input()
  public consoleGamesAmountLimit: number = 0;
  @Input()
  public consoles: IConsoleShowingStatus[] = [];
  @Output()
  public checkedConsole = new EventEmitter<IConsoleShowingStatus>();

  onChangeLimit(event: any) {
      this.changeLimit.emit(Number(event.target.value))
  }

  onCheckedConsole(consoleStatus: IConsoleShowingStatus) {
    this.checkedConsole.emit(consoleStatus);
  }
}
