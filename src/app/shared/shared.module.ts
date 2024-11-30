import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutsModule} from "@shared/layouts/layouts.module";
import {TablesModule} from "@shared/tables/tables.module";
import {PipesModule} from "@shared/pipes/pipes.module";
import {ComponentsModule} from "@shared/components/components.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    LayoutsModule,
    PipesModule,
    TablesModule
  ],
  exports: [
    ComponentsModule,
    LayoutsModule,
    PipesModule,
    TablesModule
  ]
})
export class SharedModule {
}
