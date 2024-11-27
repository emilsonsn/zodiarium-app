import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutsModule} from './layouts/layouts.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutsModule
  ],
  exports: [
    LayoutsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
