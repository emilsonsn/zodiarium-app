import { Component } from '@angular/core';
import {FormService} from "@services/public/quiz/form.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-date-of-birth',
  templateUrl: './date-of-birth.component.html',
  styleUrl: './date-of-birth.component.scss'
})
export class DateOfBirthComponent {
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
