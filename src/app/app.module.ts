import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import player from 'lottie-web';
import {provideLottieOptions} from "ngx-lottie";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideLottieOptions({
      player: () => player,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
