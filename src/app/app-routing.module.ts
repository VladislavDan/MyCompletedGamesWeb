import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {routs} from './common/navigate.constants';
import {GoogleBackupsComponent} from './screens/google-backups/google-backups.component';
import {GamesComponent} from './screens/games/games.component';
import {ChartComponent} from './screens/chart/chart.component';
import {LocalBackupsComponent} from './screens/local-backups/local-backups.component';
import {GameEditorComponent} from './screens/game-editor/game-editor.component';
import {GoogleAuthComponent} from './screens/google-auth/google-auth.component';

const routes: Routes = [
  {path: routs.games, component: GamesComponent},
  {path: routs.googleAuth, component: GoogleAuthComponent},
  {path: routs.googleBackups, component: GoogleBackupsComponent},
  {path: routs.chart, component: ChartComponent},
  {path: routs.localBackups, component: LocalBackupsComponent},
  {path: routs.gameEditor + '/:id', component: GameEditorComponent},
  {path: routs.newGame, component: GameEditorComponent},
  {path: '', redirectTo: routs.games, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
