import {Component, inject} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.scss'
})
export class InitialComponent {
  translate: TranslateService = inject(TranslateService);

  translateText(key: string) {
    return this.translate.instant(key);
  }
}
