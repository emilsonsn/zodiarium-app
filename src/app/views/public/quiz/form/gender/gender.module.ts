import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenderRoutingModule } from './gender-routing.module';
import { GenderComponent } from './gender/gender.component';
import {MatButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    GenderComponent
  ],
  imports: [
    CommonModule,
    GenderRoutingModule,
    MatButton,
    TranslatePipe,
    FormsModule
  ]
})
export class GenderModule { }
