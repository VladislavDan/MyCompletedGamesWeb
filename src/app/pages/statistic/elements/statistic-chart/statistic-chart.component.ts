import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from "@angular/core";
import {
  BaseChartComponent,
  calculateViewDimensions,
  Color,
  ColorHelper,
  LegendPosition,
  ScaleType,
} from "@swimlane/ngx-charts";
import {ViewDimensions} from "@swimlane/ngx-charts/lib/common/types/view-dimension.interface";
import {ScaleBand, scaleBand, ScaleLinear, scaleLinear} from "d3-scale";

@Component({
  selector: 'statistic-chart',
  templateUrl: './statistic-chart.html',
  styleUrls: ['./statistic-chart.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticChartComponent extends BaseChartComponent {

  @Input()
  public results: { value: number, name: string }[] = [];
  @Input()
  public consoleGamesAmountLimit: number = 0;
  @Input()
  public chartHeight: number = 0;
  @Input()
  public chartWidth: number = 0;

  public yAxisLabel: string = '';
  public xAxisLabel: string = '';
  public legendPosition: LegendPosition = LegendPosition.Right;
  public dims: ViewDimensions = {
    width: 0,
    height: 0
  };
  public colors: ColorHelper | null = null;
  public margin: number[] = [10, 10, 10, 10];
  public isShowXAxis: boolean = true;
  public isShowYAxis: boolean = true;
  public xAxisHeight: number = 10;
  public yAxisWidth: number = 10;
  public showXAxisLabel: boolean = true;
  public showYAxisLabel: boolean = true;
  public isShowLegend: boolean = false;
  public transform: string = '';
  public xDomain: number[] = [];
  public yDomain: string[] = [];
  public isRoundDomains: boolean = false;
  public barPadding: number = 5;
  public xScale: ScaleLinear<number, number> | null = null;
  public yScale: ScaleBand<string> | null = null;
  public isShowGridLines: boolean = true;
  public colorScheme: Color = {
    name: 'colorsConsoles',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#BF96B8FF', '#9c96bf', '#C7B42C', '#AAAAAA']
  };
  public schemeType: ScaleType = ScaleType.Ordinal;
  public xAxisTicks: number[] = []

  update() {
    super.update();

    this.dims = calculateViewDimensions({
      width: this.chartWidth,
      height: this.results.length * 25,
      margins: this.margin,
      showXAxis: this.isShowXAxis,
      showYAxis: this.isShowYAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.isShowLegend,
      legendType: this.schemeType,
      legendPosition: this.legendPosition as any
    });

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;

    this.setColors();

    this.updateTicks()
  }

  updateTicks() {
    this.xAxisTicks = [];
    let maxX = this.xDomain[0];
    if (maxX < 10) {
      this.xAxisTicks = [0, 1, 2, 3, 4, 5];
    }
    if (maxX > 10) {
      let tick = 0;
      while (tick < maxX) {
        this.xAxisTicks.push(tick);
        tick = tick + 10;
      }
    }
  }

  getYScale(): ScaleBand<string> {
    this.yDomain = this.getYDomain();
    const height = (this.dims && this.dims.height) || 10
    const spacing = this.yDomain.length / (height / this.barPadding + 1);
    return scaleBand().range([0, height]).paddingInner(spacing).domain(this.yDomain);
  }

  getYDomain(): string[] {
    return this.results.map(d => d.name);
  }

  getXScale(): ScaleLinear<number, number> {
    this.xDomain = this.getXDomain();

    const scale = scaleLinear().range([(this.dims && this.dims.width) || 10, 0]).domain(this.xDomain);
    return this.isRoundDomains ? scale.nice() : scale;
  }

  getXDomain(): number[] {
    const values = this.results.map(d => d.value);
    const min = Math.min(0, ...values);
    const max = Math.max(...values) + 10;

    return [max, min];
  }

  onClick() {

  }

  updateYAxisWidth({width}: { width: number }): void {
    this.yAxisWidth = width - 30;
    this.update();
  }

  updateXAxisHeight({height}: { height: number }): void {
    this.xAxisHeight = height;
    this.update();
  }

  setColors(): void {
    let domain = this.xDomain;
    this.colors = new ColorHelper(this.colorScheme, this.schemeType, domain, this.customColors);
  }
}
