import {Component} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {ZodiacService} from "@services/quiz/zodiac.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-hour-of-the-day',
  templateUrl: './hour-of-the-day.component.html',
  styleUrl: './hour-of-the-day.component.scss'
})
export class HourOfTheDayComponent {
  options: AnimationOptions = {
    path: '/assets/animation/hourglass_animation.json',
  };

  selectedTime: string;

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router
  ) {
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      if (data != null && data.birth_hour) {
        this.selectedTime = data.birth_hour;
      } else if (data == null) {
        this.router.navigate(['/quiz/birth-date']).then();
      }
    });
  }

  navigateToQuiz(rota) {
    this.router.navigate([`${rota}`]);
  }

  timeChanged(hour: string) {
    const formattedTime = this.formatTime(hour);

    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      this.zodiacService.sendData({
        ...data,
        birth_hour: formattedTime,
      });
    });
  }

  formatTime(time: string): string {
    let [hour, minute] = time.split(':').map((val) => parseInt(val, 10));

    // Verifique se a hora está no formato AM/PM
    const isPM = time.includes('da tarde');
    const isAM = time.includes('da manhã');

    // Ajuste a hora com base no AM/PM
    if (isPM && hour < 12) {
      hour += 12; // Para PM, adicione 12 horas (exceto quando for 12 PM, que já está correto)
    } else if (isAM && hour === 12) {
      hour = 0; // Para 12 AM, defina como 00:xx
    }

    // Criar um novo objeto Date com a hora ajustada
    const formattedTime = new Date();
    formattedTime.setHours(hour);
    formattedTime.setMinutes(minute);

    // Converte para o formato de 12 horas (AM/PM) com base no horário brasileiro
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Para usar AM/PM
    };

    // Formatar para o formato pt-BR, que usará AM/PM automaticamente
    return formattedTime.toLocaleTimeString('pt-BR', options);
  }

}
