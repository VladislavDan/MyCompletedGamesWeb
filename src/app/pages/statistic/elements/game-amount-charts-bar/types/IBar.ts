import {DataItem} from "@swimlane/ngx-charts/lib/models/chart-data.model";

export interface IBar {
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  data: DataItem;
  isRoundEdges: boolean;
  formattedLabel: string;
  tooltipText: string;
  value: number;
  label: string;
}
