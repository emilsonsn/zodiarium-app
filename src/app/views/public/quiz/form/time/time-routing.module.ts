import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimeComponent} from "@app/views/public/quiz/form/time/time/time.component";

const routes: Routes = [
  {
    path: '',
    component: TimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeRoutingModule {
}
