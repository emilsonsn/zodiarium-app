import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "@app/views/public/quiz/quiz/quiz.component";
import {GenderComponent} from "@app/views/public/quiz/gender/gender.component";

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      {
        path: 'gender',
        component: GenderComponent
      },
      {
        path: '**',
        redirectTo: 'gender'
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
