import {Component, OnDestroy} from '@angular/core';

import {LocalStorageService} from '../../common/services/local-storage.service';
import {ChartData} from '../../types/ChartData';
import {InitializationDataService} from '../../common/services/initialization-data.service';
import {switchMap} from 'rxjs/operators';
import {Backup} from '../../types/Backup';
import {Status} from '../../types/Game';


@Component({
  selector: 'ChartComponent',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnDestroy {

  public chartData: ChartData[] = [];
  public allConsolesName: string[];
  public showXAxis: boolean = true;
  public showYAxis: boolean = true;
  public gradient: boolean = false;
  public showXAxisLabel: boolean = true;
  public showYAxisLabel: boolean = true;

  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private initializationDataService: InitializationDataService, private localStorageService: LocalStorageService) {
    this.allConsolesName = initializationDataService.allConsolesName;
    localStorageService.getBackupFromStorage().subscribe((backup: Backup) => {
      this.allConsolesName.forEach((consoleName: string) => {
        const itemOfChartData: ChartData = {
          name: consoleName,
          value: backup.games.filter(game => game.console === consoleName && game.status === Status.DONE).length
        };
        this.chartData.push(itemOfChartData);
      });
    });

    localStorageService.storageChangeChannel.pipe(
      switchMap(() => localStorageService.getBackupFromStorage())
    ).subscribe((backup: Backup) => {
      this.allConsolesName.forEach((consoleName: string) => {
        const itemOfChartData: ChartData = {
          name: consoleName,
          value: backup.games.filter(game => game.console === consoleName).length
        };
        this.chartData.push(itemOfChartData);
      });
    });
  }

  ngOnDestroy() {
  }
}
