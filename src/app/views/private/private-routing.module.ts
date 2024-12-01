import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrivateComponent } from '@shared/layouts/layout-private/layout-private.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'lead',
        loadChildren: () => import('./lead/lead.module').then(m => m.LeadModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: '**',
        redirectTo: 'home',
        canMatch: []
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
