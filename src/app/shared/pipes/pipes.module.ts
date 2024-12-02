import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneMaskPipe } from './phone-mask.pipe';
import { ProductTypePipe } from './product-type.pipe';

const pipes = [
  PhoneMaskPipe,
  ProductTypePipe
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
