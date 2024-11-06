import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from "@app/views/public/quiz/form/form/form.component";

const routes: Routes = [
  {
    path: ':lang',
    component: FormComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./translate/translate.module').then(m => m.TranslateModule),
      },
      {
        path: 'name',
        loadChildren: () => import('./name/name.module').then(m => m.NameModule),
      },
      {
        path: 'gender',
        loadChildren: () => import('./gender/gender.module').then(m => m.GenderModule),
      },
      {
        path: 'date-of-birth',
        loadChildren: () => import('./date-of-birth/date-of-birth.module').then(m => m.DateOfBirthModule),
      },
      {
        path: 'time',
        loadChildren: () => import('./time/time.module').then(m => m.TimeModule),
      },
      {
        path: 'place',
        loadChildren: () => import('./place/place.module').then(m => m.PlaceModule),
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {
}
