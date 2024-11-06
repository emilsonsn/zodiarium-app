import { Component } from '@angular/core';
import {FormService} from "@services/public/quiz/form.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss'
})
export class GenderComponent {
  name: string = '';

  constructor(protected formService: FormService, private route: ActivatedRoute) {

    // this.translateText(this.selectedLanguage);
  }

  submitForm() {
    this.formService.completeStep({name: this.name});
  }

  goBack() {
    this.formService.previousStep();
  }
}
