import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutPublicComponent} from "@shared/layouts/layout-public/layout-public.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'quiz',
        loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'sale',
        loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule)
      },
      {
        path: 'success',
        loadChildren: () => import('./success/success.module').then(m => m.SuccessModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
