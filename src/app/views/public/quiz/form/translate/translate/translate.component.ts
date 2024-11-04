import {Component, inject} from '@angular/core';
import {FormService} from "@services/public/quiz/form.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss'
})
export class TranslateComponent {
  selectedLanguage: string = 'en';
  translate: TranslateService = inject(TranslateService);
  languagesLoading: boolean = true;

  translateText(key: string) {
    this.translate.use(key);
  }

  constructor(protected formService: FormService) {
    this.translate.onLangChange.subscribe(() => {
      this.languagesLoading = false;
    });

    this.selectedLanguage = localStorage.getItem('lang') || 'en';
    this.translateText(this.selectedLanguage);
  }

  submitForm() {
    // Salva a linguagem no localStorage
    localStorage.setItem('lang', this.selectedLanguage);

    // Completa o passo do formulário
    this.translateText(this.selectedLanguage);
    this.formService.completeStep({});
  }

  goBack() {
    this.formService.previousStep();
  }
}
