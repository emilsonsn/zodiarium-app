import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateOfBirthRoutingModule } from './date-of-birth-routing.module';
import { DateOfBirthComponent } from './date-of-birth/date-of-birth.component';
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";


@NgModule({
  declarations: [
    DateOfBirthComponent
  ],
  imports: [
    CommonModule,
    DateOfBirthRoutingModule,
    MatButton,
    FormsModule,
    TranslatePipe
  ]
})
export class DateOfBirthModule { }
