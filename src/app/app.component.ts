import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routs} from './common/navigate.constants';
import {TabLink} from './types/TabLink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'MyCompletedGamesWeb';

  public tabLinks = [
    {
      label: 'GamesList',
      route: '',
      index: 0
    }, {
      label: 'Backups',
      route: routs.googleAuth,
      index: 1
    }, {
      label: 'Chart',
      route: '',
      index: 2
    },
  ];

  public activeTabLink = this.tabLinks[0];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.navigate(['']);
  }

  public onTabClick(tabLink: TabLink) {
    console.log(tabLink)
    this.router.navigate([tabLink.route]);
    this.activeTabLink = tabLink
  }

}
