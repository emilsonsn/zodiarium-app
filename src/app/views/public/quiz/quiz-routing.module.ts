import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "@app/views/public/quiz/quiz/quiz.component";
import {GenderComponent} from "@app/views/public/quiz/gender/gender.component";
import {BirthDateComponent} from "@app/views/public/quiz/birth-date/birth-date.component";

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
        path: 'birth-date',
        component: BirthDateComponent
      },
      {
        path: '**',
        redirectTo: 'birth-date'
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
