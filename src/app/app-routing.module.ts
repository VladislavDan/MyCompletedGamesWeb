import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {routs} from './common/navigate.constants';
import {GoogleBackupsComponent} from './pages/google-backups/google-backups.component';
import {GamesComponent} from './pages/games/games.component';
import {ChartComponent} from './pages/chart/chart.component';
import {LocalBackupsComponent} from './pages/local-backups/local-backups.component';
import {GameEditorComponent} from './pages/game-editor/game-editor.component';
import {GoogleAuthComponent} from './pages/google-auth/google-auth.component';

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
