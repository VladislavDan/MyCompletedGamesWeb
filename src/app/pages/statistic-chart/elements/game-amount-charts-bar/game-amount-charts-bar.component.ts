import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {ScaleBand, ScaleLinear} from "d3-scale";
import {ColorHelper, formatLabel, PlacementTypes, StyleTypes} from "@swimlane/ngx-charts";
import {ViewDimensions} from "@swimlane/ngx-charts/lib/common/types/view-dimension.interface";

import {BarOrientation} from "./types/IBarOrientation";
import {IBar} from "./types/IBar";
import {StringOrNumberOrDate} from "@swimlane/ngx-charts/lib/models/chart-data.model";

@Component({
  selector: 'g[game-amount-charts-bar-component]',
  templateUrl: './game-amount-charts-bar.html',
  styleUrls: ['./game-amount-charts-bar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameAmountChartsBarComponent {
  @Input()
  public xScale: ScaleBand<string> | null = null;

  @Input()
  public type = 'standard';

  @Input()
  public yScale: ScaleLinear<number, number> | null = null;

  @Input()
  public colors: ColorHelper | null = null;

  @Input()
  public series: {value: number, name: string}[] = [];

  @Input()
  public dims: ViewDimensions | null = null;

  @Input()
  public tooltipDisabled: boolean = false;

  @Input()
  public activeEntries: {name: string}[] = [];

  @Input()
  public animations: boolean = true;

  @Input()
  public noBarWhenZero: boolean = true;

  @Output()
  public activate = new EventEmitter();

  @Output()
  public deactivate = new EventEmitter();

  @Output()
  public select = new EventEmitter();

  onClick(): void {
    this.select.emit();
  }

  public bars: IBar[] = [];

  public placementTypes: PlacementTypes = PlacementTypes.Left;
  public barOrientation: any = BarOrientation.Vertical;
  public styleTypes = StyleTypes.tooltip;
  public seriesName = ''

  ngOnChanges(): void {
    this.update();
  }

  update(): void {
    let width: number;
    if (this.series.length) {
      width = (this.xScale && this.xScale.bandwidth()) || 10;
    }

    this.bars = this.series.map((d, index) => {
      let value = d.value;
      const label = d.name;
      const formattedLabel = formatLabel(label);
      const isRoundEdges = this.type === 'standard';

      const bar: IBar = {
        value,
        label,
        isRoundEdges,
        data: d,
        color: '',
        stops: [],
        tooltipText: '',
        width,
        formattedLabel,
        height: 0,
        x: 0,
        y: 0,
      };

      if (this.yScale && this.xScale) {
        bar.height = Math.abs(this.yScale(value) - this.yScale(0));
        bar.x = this.xScale(label) as number;

        if (value < 0) {
          bar.y = this.yScale(0);
        } else {
          bar.y = this.yScale(value);
        }
      }

      if (this.colors && this.colors.scaleType === 'ordinal') {
        bar.color = this.colors.getColor(label);
      } else {
        if (this.colors) {
          bar.color = this.colors.getColor(value);
        }
      }

      let tooltipLabel = formattedLabel;
      if (this.seriesName) {
        tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
      }

      bar.tooltipText = ``;

      return bar;
    });
  }

  isActive(entry: {name: StringOrNumberOrDate}): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item !== undefined;
  }

  trackBy(index: number, bar: IBar): string {
    return bar.label;
  }
}
