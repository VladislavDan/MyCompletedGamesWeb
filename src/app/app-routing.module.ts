import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GoogleAuthGuardService} from './common/services/google-auth-guard.service';

const routes: Routes = [{path: 'mainpage', component: '', canActivate: [GoogleAuthGuardService]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
