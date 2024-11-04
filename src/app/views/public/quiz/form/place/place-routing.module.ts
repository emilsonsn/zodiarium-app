import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlaceComponent} from "@app/views/public/quiz/form/place/place/place.component";

const routes: Routes = [
  {
    path: '',
    component: PlaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceRoutingModule {
}
