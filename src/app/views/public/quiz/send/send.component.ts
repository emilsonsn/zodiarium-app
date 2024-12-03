import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ZodiacService} from "@services/quiz/zodiac.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss'
})
export class SendComponent {

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router
  ) {

    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      if (data == null) {
        this.router.navigate(['/quiz/birth-date']).then();
      }
    });

  }

  formData = {
    name: '',
    email: '',
    phone: ''
  };

  onSubmit() {
    console.log('Dados do formulário:', this.formData);

    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      this.zodiacService.sendData({
        ...data,
        ...this.formData
      });
    });

    this.router.navigate(['/report']).then();
  }

}
