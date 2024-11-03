import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialRoutingModule } from './initial-routing.module';
import { InitialComponent } from './initial/initial.component';
import {TranslatePipe} from "@ngx-translate/core";


@NgModule({
  declarations: [
    InitialComponent
  ],
  imports: [
    CommonModule,
    InitialRoutingModule,
    TranslatePipe
  ]
})
export class InitialModule { }
