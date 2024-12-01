import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {ZodiacService} from "@services/quiz/zodiac.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  public steps: { name: string, icon: string, url: string, active: boolean }[] = [
    {
      name: 'Nascimento',
      icon: "assets/images/telescope-svgrepo-com.svg",
      url: '/quiz/birth-date',
      active: false
    },
    {
      name: "Seu Signo",
      icon: "assets/images/solar-system-svgrepo-com.svg",
      url: '/quiz/sign',
      active: false
    },
    {
      name: "Cidade",
      icon: "assets/images/planet-earth-svgrepo-com.svg",
      url: '/quiz/city',
      active: false
    },
    {
      name: "Horário",
      icon: "assets/images/clock-svgrepo-com.svg",
      url: '/quiz/hour-of-the-day',
      active: false
    },
    {
      name: 'Géneros',
      icon: 'assets/images/genders-gender-svgrepo-com.svg',
      url: '/quiz/gender',
      active: false
    },
    {
      name: "Enviar Horóscopo",
      icon: "assets/images/envelope-svgrepo-com.svg",
      url: '/quiz/send',
      active: false
    }
  ];

  constructor(
    protected readonly router: Router,
    private readonly zodiacService: ZodiacService
    ) {
  }

  ngOnInit(): void {
    this.updateSteps(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSteps(this.router.url);
    });

/*    this.zodiacService.data$.subscribe((data) => {
      console.log('Received data from child:', data);
    });*/
  }

  private updateSteps(currentUrl: string): void {
    this.steps.forEach(step => {
      step.active = (step.url === currentUrl);
    });
  }

  calculateProgress(): number {
    const activeStepIndex = this.steps.findIndex(step => step.active);
    const totalSteps = this.steps.length;
    return ((activeStepIndex + 1) / totalSteps) * 100;
  }

  disableBack(): boolean {
    return !(this.router.url === '/quiz/birth-date');
  }

  back() {
    const activeStepIndex = this.steps.findIndex(step => step.active);
    if (activeStepIndex > 0) {
      const previousStep = this.steps[activeStepIndex - 1];
      this.router.navigate([previousStep.url]).then();
    }
  }

}
