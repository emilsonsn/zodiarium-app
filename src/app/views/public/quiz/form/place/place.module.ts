import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceRoutingModule } from './place-routing.module';
import { PlaceComponent } from './place/place.component';


@NgModule({
  declarations: [
    PlaceComponent
  ],
  imports: [
    CommonModule,
    PlaceRoutingModule
  ]
})
export class PlaceModule { }
