import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {ColorHelper, ScaleType, Series} from "@swimlane/ngx-charts";
import {ScaleLinear} from "d3-scale";
import {curveLinear} from 'd3-shape';
import {BarOrientation} from "../game-amount-charts-bar/types/IBarOrientation";

@Component({
  selector: 'g[amount-games-limit-line]',
  templateUrl: 'amount-games-limit-line.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountGamesLimitLineComponent implements OnChanges {

  @Input()
  public consoleGamesAmountLimit: number = 0;
  @Input()
  public colorsLine: ColorHelper | null = null;
  @Input()
  public xScale: ScaleLinear<number, number> | null = null;
  @Input()
  public curve = curveLinear;
  @Input()
  public lineHeight = 0;

  public barOrientation: any = BarOrientation.Vertical;
  public roundEdges = false;
  public animations = false;
  public noBarWhenZero = false;
  public x = 0;
  public y = 0;
  public width = 1;
  public height = 0

  public series: Series = {
    name:'',
    series: [
      {
        name: '',
        value: 50
      }
    ]
  }
  public scaleType: ScaleType = ScaleType.Ordinal;

  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }

  update() {
    if(this.xScale) {
      this.x = this.xScale(this.consoleGamesAmountLimit);
      this.height = this.lineHeight - 70
    }
  }
}
