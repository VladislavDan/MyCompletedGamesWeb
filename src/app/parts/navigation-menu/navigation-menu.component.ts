import {ChangeDetectionStrategy, Component} from '@angular/core';

import {Router} from '@angular/router';
import {routs} from '../../common/navigate.constants';
import {EStatus} from '../../common/types/EStatus';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent {

  constructor(private router: Router) {
  }

  openDoneGamesScreen() {
    this.router.navigate([routs.games, EStatus.DONE])
  }

  openToDoScreen() {
    this.router.navigate([routs.games, EStatus.TODO])
  }

  openInProgressScreen() {
    this.router.navigate([routs.games, EStatus.IN_PROGRESS])
  }

  openAbandonedScreen() {
    this.router.navigate([routs.games, EStatus.ABANDONED])
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
