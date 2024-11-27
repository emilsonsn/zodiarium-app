import { Component } from '@angular/core';
import {environment} from "@env/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = environment.appName;

}
