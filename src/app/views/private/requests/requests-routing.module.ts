import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestsComponent} from "@app/views/private/requests/requests/requests.component";

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {
}
