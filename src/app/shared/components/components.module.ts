import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardGuiaPublicComponent} from './card-guia-public/card-guia-public.component';
import {CardBenefitingPublicComponent} from './card-benefiting-public/card-benefiting-public.component';
import {CardCommentPublicComponent} from './card-comment-public/card-comment-public.component';
import {AvatarModule} from "@shared/components/avatar/avatar.module";
import { StarRatingComponent } from './star-rating/star-rating.component';
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";


@NgModule({
  declarations: [
    CardGuiaPublicComponent,
    CardBenefitingPublicComponent,
    CardCommentPublicComponent,
    StarRatingComponent,
  ],
  exports: [
    CardGuiaPublicComponent,
    CardBenefitingPublicComponent,
    CardCommentPublicComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    MatIcon,
    MatCard,
  ]
})
export class ComponentsModule {
}
