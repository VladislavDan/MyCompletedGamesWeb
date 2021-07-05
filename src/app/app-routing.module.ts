import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {routs} from './common/navigate.constants';
import {GoogleAuthComponent} from './screens/google-auth/google-auth.component';
import {BackupsComponent} from './screens/backups/backups.component';
import {GamesComponent} from './screens/games-list/games.component';

const routes: Routes = [
  {path: routs.backups, component: BackupsComponent},
  {path: routs.googleAuth, component: GoogleAuthComponent},
  {path: routs.games, component: GamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
