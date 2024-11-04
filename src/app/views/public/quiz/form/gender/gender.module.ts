import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenderRoutingModule } from './gender-routing.module';
import { GenderComponent } from './gender/gender.component';


@NgModule({
  declarations: [
    GenderComponent
  ],
  imports: [
    CommonModule,
    GenderRoutingModule
  ]
})
export class GenderModule { }
