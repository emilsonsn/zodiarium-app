import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NameComponent} from "@app/views/public/quiz/form/name/name/name.component";

const routes: Routes = [
  {
    path: '',
    component: NameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NameRoutingModule {
}
