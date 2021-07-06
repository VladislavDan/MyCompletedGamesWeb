import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {routs} from './common/navigate.constants';
import {GoogleAuthComponent} from './screens/google-auth/google-auth.component';
import {GoogleBackupsComponent} from './screens/google-backups/google-backups.component';

const routes: Routes = [
  {path: routs.backups, component: GoogleBackupsComponent},
  {path: routs.googleAuth, component: GoogleAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
