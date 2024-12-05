import {Component, OnInit} from '@angular/core';
import {City, Country, State} from 'country-state-city';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, map, take} from 'rxjs/operators';
import {ZodiacService} from '@services/quiz/zodiac.service';
import {Router} from '@angular/router';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  searchTerm: string = '';
  filteredCities$: Observable<any[]>;
  allCities: any[] = [];
  loading: boolean = true;
  private searchSubject = new BehaviorSubject<string>('');
  selectedCity: any = null;

  options: AnimationOptions = {
    path: '/assets/animation/Animation - 1732981606697.json',
  };

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {

    this.loadAllCities();

    this.filteredCities$ = this.searchSubject.pipe(
      debounceTime(500),
      map((term) => this.filterCities(term))
    );


    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      if (data != null && data.address) {
        this.selectedCity = data.address;
        this.searchTerm = this.displayFn(data.address);
      } else if (data == null) {
        this.router.navigate(['/quiz/birth-date']).then();
      }
    });


  }

  private loadAllCities(): void {
    const allCountries = Country.getAllCountries();
    let currentIndex = 0;
    const batchSize = 1000; // Quantidade de cidades por lote

    const loadBatch = () => {
      const batch: any[] = [];
      while (batch.length < batchSize && currentIndex < allCountries.length) {
        const country = allCountries[currentIndex];
        const states = State.getStatesOfCountry(country.isoCode);
        states.forEach((state) => {
          const stateCities = City.getCitiesOfState(country.isoCode, state.isoCode);
          batch.push(
            ...stateCities.map((city) => ({
              name: city.name,
              state: state.name,
              country: country.name,
            }))
          );
        });
        currentIndex++;
      }

      this.allCities.push(...batch);
      if (currentIndex < allCountries.length) {
        setTimeout(loadBatch, 0); // Permite a execução do próximo lote
      } else {
        this.loading = false;
      }
    };

    loadBatch();
  }


  private filterCities(term: string): any[] {
    if (!term || term.length < 3) {
      return [];
    }
    return this.allCities.filter((city) =>
      city.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  displayFn(city: any): string {
    return city && city.name ? `${city.name}, ${city.state}, ${city.country}` : '';
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
