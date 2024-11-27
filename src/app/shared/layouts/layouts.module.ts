import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutPublicComponent} from './layout-public/layout-public.component';
import {RouterOutlet} from "@angular/router";
import { HeaderComponent } from './layout-public/header/header.component';
import { FooterComponent } from './layout-public/footer/footer.component';
import { SidebarComponent } from './layout-public/sidebar/sidebar.component';
import {MatDivider} from "@angular/material/divider";

@NgModule({
  declarations: [
    LayoutPublicComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MatDivider,
  ],
  exports: [
    LayoutPublicComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule {
}
