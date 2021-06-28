import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {routs} from './common/navigate.constants';
import {GoogleAuthComponent} from './screens/google-auth/google-auth.component';
import {BackupsComponent} from './screens/backups/backups.component';

const routes: Routes = [
  {path: routs.backupsList, component: BackupsComponent},
  {path: routs.googleAuth, component: GoogleAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
