import {Injectable} from "@angular/core";
import {Channel} from "../../../../MyTools/channel-conception/Channel";
import {LocalStorageService} from "../../common/services/local-storage.service";
import {map, tap} from "rxjs/operators";
import {IBackup} from "../../types/IBackup";

@Injectable()
export class StatisticService {

  public gamesAmountLimitChannel: Channel<string, number>;
  public changeGamesAmountLimitChannel: Channel<number, IBackup>;

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
                selectedShowedConsoles: []
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
