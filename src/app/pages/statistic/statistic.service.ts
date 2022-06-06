import {Injectable} from "@angular/core";
import {Channel} from "../../../../MyTools/channel-conception/Channel";
import {LocalStorageService} from "../../common/services/local-storage.service";
import {map, tap} from "rxjs/operators";
import {IBackup} from "../../types/IBackup";
import {ChartData} from "../../types/ChartData";
import {getChartData} from "./logic/getChartData";
import {getConsoles} from "./logic/getConsoles";
import {consolesNamesToShowingStatus} from "./logic/consolesNamesToShowingStatus";
import {IConsoleShowingStatus} from "../../types/IConsoleShowingStatus";
import {changeConsoleShowingStatus} from "./logic/changeConsoleShowingStatus";
import {filteredGamesByShowedConsoles} from "./logic/filteredChartDataByShowedConsoles";
import {IGame} from "../../types/IGame";

@Injectable()
export class StatisticService {

  public gamesAmountLimitChannel: Channel<string, number>;
  public changeGamesAmountLimitChannel: Channel<number, IBackup>;
  public consolesShowingStatusChannel: Channel<string, IConsoleShowingStatus[]>;
  public changeConsoleShowingStatus: Channel<IConsoleShowingStatus, IBackup>;
  public chartDataChannel: Channel<string, ChartData[]>

  constructor(private storageService: LocalStorageService) {
    this.gamesAmountLimitChannel = new Channel<string, number>(
      () => storageService.getBackupFromStorage().pipe(
        map((backup: IBackup) => {
          if(
            backup.setup &&
            backup.setup.statisticSetup &&
            backup.setup.statisticSetup.consoleGamesAmountLimit
          ) {
            return backup.setup.statisticSetup.consoleGamesAmountLimit
          } else {
            return 0;
          }
        })
      )
    )

    this.changeGamesAmountLimitChannel = new Channel<number, IBackup>(
      (limit) => storageService.getBackupFromStorage().pipe(
        map((backup) => {
          if(backup.setup) {
            backup.setup.statisticSetup.consoleGamesAmountLimit = limit;
            return backup
          } else {
            backup.setup = {
              statisticSetup: {
                consoleGamesAmountLimit: limit,
                showedConsolesInStatistic: []
              }
            }
            return backup;
          }
        }),
        tap((backup) => {
          storageService.setBackupToStorage(backup);
        })
      )
    )

    this.consolesShowingStatusChannel = new Channel<string, IConsoleShowingStatus[]>(
      () => storageService.getBackupFromStorage().pipe(
        map((backup: IBackup) => {
          const showedConsoles = backup.setup?.statisticSetup.showedConsolesInStatistic;
          const consoles = getConsoles(backup.games);
          return consolesNamesToShowingStatus(consoles, showedConsoles || [])
        })
      )
    )

    this.chartDataChannel = new Channel<string, ChartData[]>(
      () => storageService.getBackupFromStorage().pipe(
        map((backup: IBackup) => {
          const showedConsoles = backup.setup?.statisticSetup.showedConsolesInStatistic;
          return filteredGamesByShowedConsoles(backup.games, showedConsoles || []);
        }),
        map((games: IGame[]) => {
          const consoles = getConsoles(games);
          return getChartData(games, consoles);
        })
      )
    )

    this.changeConsoleShowingStatus = new Channel(
      (consoleShowingStatus) => storageService.getBackupFromStorage().pipe(
        map((backup: IBackup) => {
          const consoles = backup.setup?.statisticSetup.showedConsolesInStatistic;
          const updatedConsolesStatus = changeConsoleShowingStatus(consoles || [], consoleShowingStatus)
          if(backup.setup) {
            backup.setup.statisticSetup.showedConsolesInStatistic = updatedConsolesStatus;
            return backup
          } else {
            backup.setup = {
              statisticSetup: {
                consoleGamesAmountLimit: 10,
                showedConsolesInStatistic: updatedConsolesStatus
              }
            }
            return backup;
          }
        }),
        tap((backup) => {
          storageService.setBackupToStorage(backup);
        })
      )
    )
  }
}
