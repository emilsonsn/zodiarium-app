import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateRoutingModule } from './translate-routing.module';
import { TranslateComponent } from './translate/translate.component';
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel, MatSelect} from "@angular/material/select";


@NgModule({
  declarations: [
    TranslateComponent
  ],
  imports: [
    CommonModule,
    TranslateRoutingModule,
    FormsModule,
    TranslatePipe,
    MatButton,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField
  ]
})
export class TranslateModule { }
