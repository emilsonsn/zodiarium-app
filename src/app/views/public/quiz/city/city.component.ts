import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {ZodiacService} from '@services/quiz/zodiac.service';
import {Router} from '@angular/router';
import {AnimationOptions} from "ngx-lottie";
import {City, CityService} from "@services/quiz/city.service";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  filteredCities$: any;
  searchTerm: string = '';
  selectedCity: City | null = null;

  options: AnimationOptions = {
    path: '/assets/animation/Animation - 1732981606697.json',
  };

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router,
    private _cityService: CityService
  ) {
  }

  navigateToQuiz(rota: string) {
    this.router.navigate([`${rota}`]).then();
  }

  ngOnInit(): void {
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      if (data != null && data.address) {
        this.selectedCity = data.address;
        this.searchTerm = this.displayFn(data.address);
      } else if (data == null) {
        this.router.navigate(['/quiz/birth-date']).then();
      }
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const term = input.value.trim();
    if (term.length > 2) {
      this.filteredCities$ = this._cityService.searchCities(term);
    }
  }

  displayFn(city: any): string {
    return city && city.name ? city.name : '';
  }

  onCitySelected(city: any): void {
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      this.zodiacService.sendData({
        ...data,
        address: city,
      });
      this.selectedCity = city;
    });
  }
}
