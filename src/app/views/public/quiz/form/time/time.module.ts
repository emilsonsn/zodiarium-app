import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeRoutingModule } from './time-routing.module';
import { TimeComponent } from './time/time.component';
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    TimeComponent
  ],
  imports: [
    CommonModule,
    TimeRoutingModule,
    FormsModule,
    TranslatePipe,
    MatButton
  ]
})
export class TimeModule { }
