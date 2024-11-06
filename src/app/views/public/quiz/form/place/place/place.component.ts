import { Component } from '@angular/core';
import {FormService} from "@services/public/quiz/form.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent {
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
