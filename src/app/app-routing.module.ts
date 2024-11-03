import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from "@env/environment";

const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./views/session/session.module').then(m => m.SessionModule)
  },*/
  /*{
    path: 'painel',
    loadChildren: () => import('./views/private/private.module').then(m => m.PrivateModule),
    canActivate: [hasSessionGuard]
  },*/

  {
    path: '',
    loadChildren: () => import('./views/public/public.module').then(m => m.PublicModule)
  },
  {
    path: '**',
    redirectTo: environment.home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}