import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ChartData} from '../../types/ChartData';
import {InitializationDataService} from '../../common/services/initialization-data.service';
import {StatisticService} from "./statistic.service";
import {Subscription} from "rxjs";
import {IConsoleShowingStatus} from "../../types/IConsoleShowingStatus";


@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatisticComponent implements OnDestroy, OnInit {

  public chartData: ChartData[] = [];
  public consolesShowingStatus: IConsoleShowingStatus[] = [];
  public consoleGamesAmountLimit: number = 0;
  public chartHeight = 0;
  public chartWidth = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private initializationDataService: InitializationDataService,
    private statisticService: StatisticService
  ) {
    this.subscriptions.add(statisticService.chartDataChannel.subscribe((chartData) => {
      this.chartData = chartData;
    }));

    this.subscriptions.add(statisticService.changeGamesAmountLimitChannel.subscribe(() => {
      statisticService.gamesAmountLimitChannel.next('');
    }));

    this.subscriptions.add(statisticService.gamesAmountLimitChannel.subscribe((limit) => {
      this.consoleGamesAmountLimit = limit;
    }));

    this.subscriptions.add(statisticService.consolesShowingStatusChannel.subscribe((consoles) => {
      this.consolesShowingStatus = consoles;
    }));

    this.subscriptions.add(this.statisticService.changeConsoleShowingStatus.subscribe(() => {
      this.statisticService.consolesShowingStatusChannel.next('');
      this.statisticService.chartDataChannel.next('');
    }));
  }

  ngOnInit() {
    this.chartHeight = window.screen.height - window.screen.height / 3;
    this.chartWidth = window.screen.width;
    this.statisticService.gamesAmountLimitChannel.next('');
    this.statisticService.consolesShowingStatusChannel.next('');
    this.statisticService.chartDataChannel.next('');
  }

  onChangeGamesAmountLimit(limit: number) {
    this.statisticService.changeGamesAmountLimitChannel.next(limit);
  }

  onChangeShowingConsoleStatus(showingConsoleStatus: IConsoleShowingStatus) {
    this.statisticService.changeConsoleShowingStatus.next(showingConsoleStatus);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
