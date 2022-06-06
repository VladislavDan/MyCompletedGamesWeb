import {IGame, Status} from "../../../types/IGame";
import {ChartData} from "../../../types/ChartData";

export const getChartData = (games: IGame[], allConsolesNames: string[]): ChartData[] => {
  const chartData: ChartData[] = []

  allConsolesNames.forEach((consoleName: string) => {

    const itemOfChartData: ChartData = {
      name: consoleName,

      value: games.filter(game => {
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

  return chartData;
}
