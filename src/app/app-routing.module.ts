import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'painel',
    loadChildren: () => import('./views/private/private.module').then(m => m.PrivateModule)
  },
  {
    path: 'session',
    loadChildren: () => import('./views/session/session.module').then(m => m.SessionModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
