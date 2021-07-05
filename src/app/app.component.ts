import {Component, OnInit} from '@angular/core';
import {ActivationEnd, Event, Router} from '@angular/router';
import {routs} from './common/navigate.constants';
import {TabLink} from './types/TabLink';
import {LocalStorageService} from './common/services/local-storage.service';

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
      route: routs.games,
      index: 0
    }, {
      label: 'Backups',
      route: routs.googleAuth,
      index: 1
    }, {
      label: 'Chart',
      route: 'gfhfghfgh',
      index: 2
    },
  ];

  public activeTabLink = this.tabLinks[0];

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    router.events.subscribe((event: Event) => {

      if((event as ActivationEnd).snapshot && (event as ActivationEnd).snapshot.url) {
        const route = (event as ActivationEnd).snapshot.url.toString();

        if(route !== ''){
          this.tabLinks.forEach((link: TabLink) => {
            if( route === link.route ) {
              this.activeTabLink = link;
            }
          })
        }
      }
    });

    this.localStorageService.storageChangeChannel.subscribe(() => {
      this.tabLinks[0].label = 'GamesList (' + this.localStorageService.getBackupFromStorage().games.length + ')'
    })
  }

  ngOnInit(): void {
    this.router.navigate([routs.games]);
    this.tabLinks[0].label = 'GamesList (' + this.localStorageService.getBackupFromStorage().games.length + ')'
  }

  public onTabClick(tabLink: TabLink) {
    console.log(tabLink);
    this.router.navigate([tabLink.route]);
    this.activeTabLink = tabLink
  }

}
