import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {
  BaseChartComponent,
  calculateViewDimensions,
  Color,
  ColorHelper,
  LegendOptions,
  LegendPosition,
  ScaleType,
} from "@swimlane/ngx-charts";
import {ViewDimensions} from "@swimlane/ngx-charts/lib/common/types/view-dimension.interface";
import {ScaleBand, scaleBand, ScaleLinear, scaleLinear} from "d3-scale";

@Component({
  selector: 'StatisticChartComponent',
  templateUrl: './statistic-chart.html',
  styleUrls: ['./statistic-chart.scss']
})
export class StatisticChartComponent extends BaseChartComponent implements OnChanges, OnInit {

  @Input()
  public results: {value: number, name: string}[] = [];

  public height: number = 0;
  public width: number = 0;
  public legendSpacing: number = 40;
  public seriesDomain: string[] = [];
  public legendOptions: LegendOptions = {
    colors: null,
    domain: [],
    position: LegendPosition.Right,
    title: '',
    scaleType: ScaleType.Linear
  };
  public yAxisLabel: string = '';
  public xAxisLabel: string = '';
  public combinedSeries: {name: string, series: {value: number, name: string}[]}[] = [];
  public legendPosition: LegendPosition = LegendPosition.Right;
  public dims: ViewDimensions = {
    width: 200,
    height: 600
  };
  public colorsLine: ColorHelper | null = null;
  public colors: ColorHelper | null = null;
  public legendTitle: string = '';
  public margin: number[] = [10, 10, 10, 10];
  public isShowXAxis: boolean = true;
  public isShowYAxis: boolean = true;
  public xAxisHeight: number = 10;
  public yAxisWidth: number = 10;
  public showXAxisLabel: boolean = true;
  public showYAxisLabel: boolean = true;
  public isShowLegend: boolean = false;
  public transform: string = '';
  public activeEntries: {name: string}[] = [];
  public xDomain: number[] = [];
  public yDomain: string[] = [];
  public isRoundDomains: boolean = false;
  public barPadding: number = 5;
  public xScale: ScaleLinear<number, number> | null = null;
  public yScale: ScaleBand<string> | null = null;
  public isShowGridLines: boolean = true;
  public colorSchemeLine: Color = {
    name: 'singleLightBlue',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#01579b']
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.height = window.screen.height / 1.2;
    this.width = window.screen.width / 2;
  }

  update() {
    super.update();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
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

    this.seriesDomain = this.getSeriesDomain();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;

    this.setColors();
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
    const max = Math.max(...values);

    return [max, min];
  }

  getSeriesDomain() {
    this.combinedSeries.push({
      name: this.yAxisLabel,
      series: this.results
    });
    return this.combinedSeries.map(d => d.name);
  }

  getLegendOptions() {
    const opts = {
      scaleType: this.schemeType,
      colors: {},
      domain: [''],
      title: '',
      position: this.legendPosition
    };
    if (opts.scaleType === ScaleType.Ordinal) {
      opts.domain = this.seriesDomain;
      opts.colors = this.colorsLine as ColorHelper;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.seriesDomain;
      opts.colors = ( this.colors as ColorHelper ).scale;
    }
    return opts;
  }

  onActivate(item: {name: string}) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [item, ...this.activeEntries];
  }

  onDeactivate(item: {name: string}) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];
  }

  onClick() {

  }

  updateYAxisWidth({ width }: {width: number}): void {
    this.yAxisWidth = width + 20;
    this.update();
  }

  updateXAxisHeight({ height }: {height: number}): void {
    this.xAxisHeight = height;
    this.update();
  }

  setColors(): void {
    let domain;
    if (this.schemeType === ScaleType.Ordinal) {
      domain = this.xDomain;
    } else {
      domain = this.yDomain;
    }
    this.colors = new ColorHelper(this.colorSchemeLine, this.schemeType, domain, this.customColors);
    this.colorsLine = new ColorHelper(this.colorSchemeLine, this.schemeType, domain, this.customColors);
  }
}
