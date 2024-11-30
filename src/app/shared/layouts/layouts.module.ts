import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPublicComponent } from './layout-public/layout-public.component';
import { LayoutPublicHeaderComponent } from './layout-public/layout-public-header/layout-public-header.component';
import { LayoutPublicFooterComponent } from './layout-public/layout-public-footer/layout-public-footer.component';
import { LayoutPublicSidebarComponent } from './layout-public/layout-public-sidebar/layout-public-sidebar.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatDivider} from "@angular/material/divider";



@NgModule({
  declarations: [
    LayoutPublicComponent,
    LayoutPublicHeaderComponent,
    LayoutPublicFooterComponent,
    LayoutPublicSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MatDivider,
    RouterLink
  ]
})
export class LayoutsModule { }
