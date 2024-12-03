import {Component} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {ZodiacService} from "@services/quiz/zodiac.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-birth-date',
  templateUrl: './birth-date.component.html',
  styleUrl: './birth-date.component.scss'
})
export class BirthDateComponent {
  options: AnimationOptions = {
    path: '/assets/animation/telescope_animation.json',
  };

  selectedMonth: string = '01';
  selectedDay: number = 1;
  selectedYear: number = 1994;
  years: number[] = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);
  days: number[] = [];

  constructor(private readonly zodiacService: ZodiacService) {
  }

  ngOnInit(): void {
    this.updateDays();
  }

  updateDays(): void {
    const month = parseInt(this.selectedMonth, 10);
    const year = this.selectedYear || new Date().getFullYear();

    const daysInMonth = this.getDaysInMonth(month, year);

    this.days = Array.from({length: daysInMonth}, (_, i) => i + 1);
    if (this.selectedDay && this.selectedDay > daysInMonth) {
      this.selectedDay = daysInMonth;
    }
  }

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  saveDate() {
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      this.zodiacService.sendData({
        ...data,
        day: this.selectedDay.toString(),
        month: this.selectedMonth,
        year: this.selectedYear.toString(),
      });
    });
  }
}
