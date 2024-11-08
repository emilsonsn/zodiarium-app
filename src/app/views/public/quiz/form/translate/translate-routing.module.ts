import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslateComponent} from "@app/views/public/quiz/form/translate/translate/translate.component";

const routes: Routes = [
  {
    path: '',
    component: TranslateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslateRoutingModule {
}
