import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "@app/views/public/quiz/quiz/quiz.component";

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      {
        path: 'initial',
        loadChildren: () => import('./initial/initial.module').then(m => m.InitialModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {
}
