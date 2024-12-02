import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { GenderComponent } from './gender/gender.component';
import {LottieComponent} from "ngx-lottie";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIconButton} from "@angular/material/button";
import { BirthDateComponent } from './birth-date/birth-date.component';
import {FormsModule} from "@angular/forms";
import { SignComponent } from './sign/sign.component';
import { CityComponent } from './city/city.component';
import { HourOfTheDayComponent } from './hour-of-the-day/hour-of-the-day.component';
import { SendComponent } from './send/send.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";


@NgModule({
  declarations: [
    QuizComponent,
    GenderComponent,
    BirthDateComponent,
    SignComponent,
    CityComponent,
    HourOfTheDayComponent,
    SendComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    LottieComponent,
    MatProgressBar,
    MatTooltip,
    MatIconButton,
    FormsModule,
    MatLabel,
    MatFormField,
    MatOption,
    MatAutocomplete,
    MatInput,
    MatAutocompleteTrigger,
    MatProgressSpinner,
    MatSelectTrigger,
    MatSelect
  ]
})
export class QuizModule { }