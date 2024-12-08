import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ZodiacService} from "@services/quiz/zodiac.service";
import { ToastrService } from 'ngx-toastr';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss'
})
export class SendComponent {

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router,
    private readonly _toastService: ToastrService
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
    ddi: '+351',
    phone: ''
  };

  ddiList = [
    { name: 'Portugal', code: '+351' },
    { name: 'Brasil', code: '+55' },
    { name: 'Espanha', code: '+34' },
    { name: 'Estados Unidos', code: '+1' },
    { name: 'Argentina', code: '+54' },
    { name: 'França', code: '+33' },
    { name: 'Reino Unido', code: '+44' },
    { name: 'Alemanha', code: '+49' },
    { name: 'Itália', code: '+39' }
  ];

  onSubmit() {
    if(!this.formData.name || !this.formData.email || !this.formData.phone){
      this._toastService.warning('Preencha todos os campos para continuar');
      return;
    }
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      this.zodiacService.sendData({
        ...data,
        ...this.formData
      });
    });

    this.router.navigate(['/report']).then();
  }

}
