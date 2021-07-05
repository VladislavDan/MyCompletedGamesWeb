import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routs} from './common/navigate.constants';
import {LocalStorageService} from './common/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'MyCompletedGamesWeb';
  public gamesListLabel = '';

  constructor(private router: Router, private localStorageService: LocalStorageService) {

    this.localStorageService.storageChangeChannel.subscribe(() => {
      this.gamesListLabel = 'GamesList (' + this.localStorageService.getBackupFromStorage().games.length + ')'
    })
  }

  ngOnInit(): void {
    this.router.navigate([routs.googleAuth]);
    this.gamesListLabel = 'GamesList (' + this.localStorageService.getBackupFromStorage().games.length + ')'
  }
}
