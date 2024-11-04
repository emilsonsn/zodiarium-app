import {Component, inject} from '@angular/core';
import {FormService} from "@services/public/quiz/form.service";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";

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

  constructor(protected formService: FormService, private route: ActivatedRoute) {
    this.translate.onLangChange.subscribe(() => {
      this.languagesLoading = false;
    });

    let lang = localStorage.getItem('lang') || 'en';
    if (this.route.snapshot.params['lang']) {
      lang = this.route.snapshot.params['lang'];
    }

    localStorage.setItem('lang', lang);

    this.selectedLanguage = lang;
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
