import { Component } from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

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
  years: number[] = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  days: number[] = [];

  ngOnInit(): void {
    this.updateDays();  // Atualiza os dias no início
  }

  // Função para atualizar os dias dependendo do mês e ano
  updateDays(): void {
    const month = parseInt(this.selectedMonth, 10);
    const year = this.selectedYear || new Date().getFullYear();

    // Define o número de dias por mês
    const daysInMonth = this.getDaysInMonth(month, year);

    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    // Caso o dia selecionado seja maior que o máximo para o mês, ajusta
    if (this.selectedDay && this.selectedDay > daysInMonth) {
      this.selectedDay = daysInMonth;
    }
  }

  // Função para calcular o número de dias no mês, considerando ano bissexto
  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }
}
