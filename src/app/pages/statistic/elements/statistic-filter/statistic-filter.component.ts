import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'StatisticFilterComponent',
  templateUrl: 'statistic-filter.html'
})
export class StatisticFilterComponent {

  @Output()
  public changeLimit = new EventEmitter<number>();
  @Input()
  public consoleGamesAmountLimit: number = 0;

  onChangeLimit(event: any) {
      this.changeLimit.emit(Number(event.target.value))
  }
}
