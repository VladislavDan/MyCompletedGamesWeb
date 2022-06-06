import {IConsoleShowingStatus} from "../../../types/IConsoleShowingStatus";

export const changeConsoleShowingStatus = (
  showedConsoles: string[],
  consoleShowingStatus: IConsoleShowingStatus
): string[] => {
  const changingConsoleName = consoleShowingStatus.consoleName;
  const changingConsoleIndex = showedConsoles.indexOf(changingConsoleName)

  if(changingConsoleIndex > -1) {
    if(!consoleShowingStatus.isShow) {
      showedConsoles.splice(changingConsoleIndex, 1);
    }
  } else {
    if(consoleShowingStatus.isShow) {
      showedConsoles.push(changingConsoleName);
    }
  }
  return showedConsoles;
}
