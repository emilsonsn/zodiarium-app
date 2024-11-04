import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenderComponent} from "@app/views/public/quiz/form/gender/gender/gender.component";

const routes: Routes = [
  {
    path: '',
    component: GenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenderRoutingModule {
}
