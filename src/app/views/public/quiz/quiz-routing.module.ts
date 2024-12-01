import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "@app/views/public/quiz/quiz/quiz.component";
import {GenderComponent} from "@app/views/public/quiz/gender/gender.component";
import {BirthDateComponent} from "@app/views/public/quiz/birth-date/birth-date.component";
import {SignComponent} from "@app/views/public/quiz/sign/sign.component";
import {CityComponent} from "@app/views/public/quiz/city/city.component";
import {HourOfTheDayComponent} from "@app/views/public/quiz/hour-of-the-day/hour-of-the-day.component";
import {SendComponent} from "@app/views/public/quiz/send/send.component";

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      {
        path: 'birth-date',
        component: BirthDateComponent
      },
      {
        path: 'sign',
        component: SignComponent
      },
      {
        path: 'city',
        component: CityComponent
      },
      {
        path: 'hour-of-the-day',
        component: HourOfTheDayComponent
      },
      {
        path: 'gender',
        component: GenderComponent
      },
      {
        path: 'send',
        component: SendComponent
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
