import {Component} from '@angular/core';
import {FormService} from "@services/public/quiz/form.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss'
})
export class TranslateComponent {
  selectedLanguage: string = 'en';

  constructor(protected formService: FormService, private route: ActivatedRoute) {

    // this.translateText(this.selectedLanguage);
  }

  submitForm() {
    // Salva a linguagem no localStorage
    localStorage.setItem('lang', this.selectedLanguage);

    // Completa o passo do formulário
    // this.translateText(this.selectedLanguage);
    this.formService.completeStep({});
  }

  goBack() {
    this.formService.previousStep();
  }
}
