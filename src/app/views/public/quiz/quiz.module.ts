import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { GenderComponent } from './gender/gender.component';
import {LottieComponent} from "ngx-lottie";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIconButton} from "@angular/material/button";


@NgModule({
  declarations: [
    QuizComponent,
    GenderComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    LottieComponent,
    MatProgressBar,
    MatTooltip,
    MatIconButton
  ]
})
export class QuizModule { }
