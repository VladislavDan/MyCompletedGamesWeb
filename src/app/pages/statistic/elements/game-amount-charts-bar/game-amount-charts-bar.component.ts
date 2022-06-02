import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {ScaleBand, ScaleLinear} from "d3-scale";
import {ColorHelper, formatLabel, PlacementTypes, StyleTypes} from "@swimlane/ngx-charts";

import {BarOrientation} from "./types/IBarOrientation";
import {IBar} from "./types/IBar";

@Component({
  selector: 'g[game-amount-charts-bar-component]',
  templateUrl: './game-amount-charts-bar.html',
  styleUrls: ['./game-amount-charts-bar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameAmountChartsBarComponent implements OnChanges {
  @Input()
  public xScale: ScaleBand<string> | null = null;

  @Input()
  public yScale: ScaleLinear<number, number> | null = null;

  @Input()
  public colors: ColorHelper | null = null;

  @Input()
  public series: { value: number, name: string }[] = [];

  @Output()
  public select = new EventEmitter();

  onClick(): void {
    this.select.emit();
  }

  public bars: IBar[] = [];

  public placementTypes: PlacementTypes = PlacementTypes.Top;
  public barOrientation: any = BarOrientation.Horizontal;
  public styleTypes = StyleTypes.tooltip;
  public seriesName = '';
  public noBarWhenZero: boolean = true;
  public animations: boolean = false;

  ngOnChanges(): void {
    this.update();
  }

  update(): void {
    let height: number;
    if (this.series.length) {
      height = (this.xScale && this.xScale.bandwidth()) || 10;
    }

    this.bars = this.series.map((d, index) => {
      let value = d.value;
      const label = d.name;
      const formattedLabel = formatLabel(label);

      const bar: IBar = {
        value,
        label,
        isRoundEdges: true,
        data: d,
        color: '',
        tooltipText: '',
        height,
        formattedLabel,
        width: 0,
        x: 0,
        y: 0
      };

      if (this.yScale && this.xScale) {
        bar.width = Math.abs(this.yScale(0) - this.yScale(value));
        bar.y = this.xScale(label) as number;

        bar.x = 0;
      }

      if (this.colors) {
        bar.color = this.colors.getColor(value);
      }

      bar.tooltipText = `
        <span class="tooltip-label">${`${label}: ${value}`}</span>
      `;

      return bar;
    });
  }
}
