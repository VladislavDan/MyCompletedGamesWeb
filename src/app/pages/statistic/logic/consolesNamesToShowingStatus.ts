import {IConsoleShowingStatus} from "../../../common/types/IConsoleShowingStatus";

export const consolesNamesToShowingStatus = (
  consoleNames: string[],
  showedConsoles: string[]
): IConsoleShowingStatus[] => {
  return consoleNames.map((consoleName: string) => {
    const isShowedConsole = showedConsoles.indexOf(consoleName) > -1
    return {
      consoleName,
      isShow: isShowedConsole
    }
  })
}
