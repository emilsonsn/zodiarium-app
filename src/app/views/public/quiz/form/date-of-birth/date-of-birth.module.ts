import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateOfBirthRoutingModule } from './date-of-birth-routing.module';
import { DateOfBirthComponent } from './date-of-birth/date-of-birth.component';


@NgModule({
  declarations: [
    DateOfBirthComponent
  ],
  imports: [
    CommonModule,
    DateOfBirthRoutingModule
  ]
})
export class DateOfBirthModule { }
