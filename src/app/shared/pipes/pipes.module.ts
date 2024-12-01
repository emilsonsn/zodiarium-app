import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneMaskPipe } from './phone-mask.pipe';

const pipes = [
  PhoneMaskPipe
];

@NgModule({
  declarations: [
    pipes
  ],
  exports: [
    pipes
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
