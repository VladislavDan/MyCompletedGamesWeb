import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {LocalStorageService} from '../../common/services/local-storage.service';
import {ChartData} from '../../types/ChartData';
import {InitializationDataService} from '../../common/services/initialization-data.service';
import {switchMap} from 'rxjs/operators';
import {IBackup} from '../../types/IBackup';
import {Status} from '../../types/Game';
import {StatisticService} from "./statistic.service";


@Component({
  selector: 'StatisticComponent',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatisticComponent implements OnDestroy, OnInit {

  public chartData: ChartData[] = [];
  public allConsolesName: string[];
  public consoleGamesAmountLimit: number = 0;
  public chartHeight = 0;
  public chartWidth = 0;

  constructor(
    private initializationDataService: InitializationDataService,
    private localStorageService: LocalStorageService,
    private statisticService: StatisticService
  ) {
    this.allConsolesName = initializationDataService.allConsolesName;
    localStorageService.getBackupFromStorage().subscribe((backup: IBackup) => {
      this.updateChartData(backup)
    });

    localStorageService.storageChangeChannel.pipe(
      switchMap(() => localStorageService.getBackupFromStorage())
    ).subscribe((backup: IBackup) => {
      this.updateChartData(backup)
    });

    statisticService.changeGamesAmountLimitChannel.subscribe(() => {
      statisticService.gamesAmountLimitChannel.next('');
    });

    statisticService.gamesAmountLimitChannel.subscribe((limit) => {
      this.consoleGamesAmountLimit = limit;
    }, () => {}, true)

    statisticService.gamesAmountLimitChannel.next('');
  }

  ngOnInit() {
    this.chartHeight = window.screen.height - window.screen.height / 10;
    this.chartWidth = window.screen.width;
  }

  updateChartData(backup: IBackup) {

    const chartData: ChartData[] = []

    this.allConsolesName.forEach((consoleName: string) => {

      const itemOfChartData: ChartData = {
        name: consoleName,

        value: backup.games.filter(game => {
          return game.console === consoleName && game.status === Status.DONE
        }).length
      };

      chartData.push(itemOfChartData);

      chartData.sort((a: ChartData, b: ChartData) => {
        if(a.value > b.value) {
          return -1;
        } else if(a.value < b.value) {
          return 1;
        } else {
          return 0;
        }
      })
    });

    this.chartData = chartData;
  }

  onChangeGamesAmountLimit(limit: number) {
    this.statisticService.changeGamesAmountLimitChannel.next(limit);
  }

  ngOnDestroy() {
  }
}
