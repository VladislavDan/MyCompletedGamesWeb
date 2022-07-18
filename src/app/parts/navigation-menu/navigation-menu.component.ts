import {ChangeDetectionStrategy, Component} from '@angular/core';

import {Router} from '@angular/router';
import {routs} from '../../common/navigate.constants';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent {

  constructor(private router: Router) {
  }

  openGamesScreen() {
    this.router.navigate([routs.games])
  }

  openGoogleBackupsScreen() {
    this.router.navigate([routs.googleAuth])
  }

  openLocalBackupsScreen() {
    this.router.navigate([routs.localBackups])
  }

  openChartScreen() {
    this.router.navigate([routs.chart])
  }
}
