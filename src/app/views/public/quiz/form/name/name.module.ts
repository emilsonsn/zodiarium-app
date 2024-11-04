import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NameRoutingModule } from './name-routing.module';
import { NameComponent } from './name/name.component';
import {MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";


@NgModule({
  declarations: [
    NameComponent
  ],
  imports: [
    CommonModule,
    NameRoutingModule,
    MatOption,
    MatSelect,
    MatFormField,
    FormsModule,
    TranslatePipe,
    MatButton,
    MatInput
  ]
})
export class NameModule { }
