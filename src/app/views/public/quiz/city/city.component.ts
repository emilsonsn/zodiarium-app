import { Component, OnInit } from '@angular/core';
import { take, debounceTime, switchMap } from 'rxjs/operators';
import { ZodiacService } from '@services/quiz/zodiac.service';
import { Router } from '@angular/router';
import { AnimationOptions } from "ngx-lottie";
import { City2Service } from '@services/city2.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  searchTerm: string = '';
  selectedCity: any = null;
  cities: any[] = []; // Agora usamos um array simples

  options: AnimationOptions = {
    path: '/assets/animation/Animation - 1732981606697.json',
  };

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router,
    private _city2Service: City2Service // Agora usamos apenas o City2Service (GeoNames)
  ) {}

  ngOnInit(): void {
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      if (data?.address) {
        this.selectedCity = data.address;
        this.searchTerm = this.displayFn(data.address);
      } else if (!data) {
        this.router.navigate(['/quiz/birth-date']).then();
      }
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const term = input.value.trim();
    if (term.length > 2) {
      this._city2Service.getCities(term).subscribe((cities) => {
        this.cities = cities; // Atualiza a lista de cidades
      });
    }
  }

  displayFn(city: any): string {
    return city ? `${city.city}, ${city.state} - ${city.country}` : '';
  }

  onCitySelected(location: any): void {
    const address = `${location.city}, ${location.state}, ${location.country}`;
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      data.address = address;
      console.log(data);
      this.zodiacService.sendData({
        ...data,      
      });
      this.selectedCity = address;
    });
  }

  navigateToQuiz(rota: string) {
    this.router.navigate([`${rota}`]).then();
  }
}
