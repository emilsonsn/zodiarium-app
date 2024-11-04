import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DateOfBirthComponent} from "@app/views/public/quiz/form/date-of-birth/date-of-birth/date-of-birth.component";

const routes: Routes = [
  {
    path: '',
    component: DateOfBirthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateOfBirthRoutingModule { }
