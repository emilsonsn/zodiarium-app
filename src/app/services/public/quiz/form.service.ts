import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  translate: TranslateService = inject(TranslateService);
  private steps = [
    '',
    'name',
    'gender',
    'date-of-birth',
    'time',
    'place',
    'report'
  ];

  public stepsIcons = [
    "fa-solid fa-language",
    "fa-solid fa-signature",
    "fa-solid fa-venus-mars",
    "fa-solid fa-cake-candles",
    "fa-solid fa-clock",
    "fa-solid fa-map-location-dot",
    "fa-solid fa-file-lines"
  ]
  private currentStepIndex = 0;
  private responses: { [key: string]: any } = {};
  languagesLoading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.translate.onLangChange.subscribe(() => {
      this.languagesLoading = false;
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      console.log("event", event);
      const currentUrl = this.router.url;

      const currentUrlArray = currentUrl.split("/");

      const stepIndex = this.steps.indexOf(currentUrlArray[currentUrlArray.length - 1]);

      const position = stepIndex !== -1 ? stepIndex : 0;

      if (position === 0) {
        this.clearProgress();
      }

    });
    this.loadProgress();
    this.navigateToCurrentStep();
  }

  // Obter a etapa atual
  getCurrentStep() {
    return this.steps[this.currentStepIndex];
  }

  // Armazenar a resposta para a etapa atual e navegar para a próxima
  completeStep(response: any) {
    const currentStep = this.getCurrentStep();
    this.responses[currentStep] = response;
    this.saveProgress();

    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.saveProgress();
      this.navigateToCurrentStep(true);
    }
  }

  // Voltar para a etapa anterior
  previousStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.saveProgress();
      this.navigateToCurrentStep(true);
    }
  }

  public getLengthSteps() {
    return this.steps.length
  }

  getCurrentStepIndex(): number {
    return this.currentStepIndex;
  }

  // Obter todas as respostas
  getResponses() {
    return this.responses;
  }

  // Salvar o progresso atual no localStorage
  private saveProgress() {
    localStorage.setItem('currentStepIndex', JSON.stringify(this.currentStepIndex));
    localStorage.setItem('responses', JSON.stringify(this.responses));
  }

  // Carregar o progresso salvo do localStorage
  private loadProgress() {
    const savedStepIndex = localStorage.getItem('currentStepIndex');
    const savedResponses = localStorage.getItem('responses');

    if (savedStepIndex) {
      this.currentStepIndex = JSON.parse(savedStepIndex);
    }

    if (savedResponses) {
      this.responses = JSON.parse(savedResponses);
    }
  }

  // Função para apagar os estados do localStorage
  private clearProgress() {
    localStorage.removeItem('currentStepIndex');
    localStorage.removeItem('responses');

    // Opcional: redefinir as propriedades da classe
    this.currentStepIndex = 0; // ou o valor inicial desejado
    this.responses = []; // ou o valor inicial desejado
  }

  translateText(key: string) {
    this.translate.use(key);
  }


  // Navegar para a etapa atual baseada no índice
  private navigateToCurrentStep(force = false) {
    let lang = localStorage.getItem('lang') || 'en';

    localStorage.setItem('lang', lang);

    if (!force) {
      const currentUrl = this.router.url;
      lang = currentUrl.split("/")[1];
    }

    this.translateText(lang);

    const currentStep = this.getCurrentStep();
    this.router.navigate([`/${lang}/${currentStep}`], {replaceUrl: true}).then();
  }
}
