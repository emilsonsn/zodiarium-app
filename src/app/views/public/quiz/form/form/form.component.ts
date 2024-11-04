import {Component} from '@angular/core';
import {FormService} from "@services/public/quiz/form.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(public formService: FormService) {
  }
}
