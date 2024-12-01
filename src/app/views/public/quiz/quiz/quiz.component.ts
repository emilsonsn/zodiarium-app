import {Component} from '@angular/core';
import {Router} from "@angular/router";

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
      url: 'birth-date',
      active: false
    },
    {
      name: "Seu Signo",
      icon: "assets/images/solar-system-svgrepo-com.svg",
      url: 'sign',
      active: false
    },
    {
      name: "Cidade",
      icon: "assets/images/planet-earth-svgrepo-com.svg",
      url: 'city',
      active: false
    },
    {
      name: "Horário",
      icon: "assets/images/clock-svgrepo-com.svg",
      url: 'age',
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
      url: 'send',
      active: false
    }
  ];

  constructor(protected readonly router: Router) {
  }

  ngOnInit(): void {
    this.updateSteps(this.router.url);
  }

  private updateSteps(currentUrl: string): void {
    this.steps.forEach(step => {
      step.active = (step.url === currentUrl);
    });

    console.log(this.steps);
  }

  calculateProgress(): number {
    const activeStepIndex = this.steps.findIndex(step => step.active);
    const totalSteps = this.steps.length;
    return ((activeStepIndex + 1) / totalSteps) * 100;
  }

}
