import {Component} from '@angular/core';
import {City, Country, State} from 'country-state-city';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent {
  searchTerm: string = '';
  filteredCities$: Observable<any[]>;
  private searchSubject = new Subject<string>();
  selectedCity: any = null;

  constructor() {
    this.filteredCities$ = this.searchSubject.pipe(
      debounceTime(300),
      switchMap((term) => {
        if (term.length < 3) {
          return of([]);
        }
        return this.searchCities(term).pipe(
          catchError(() => of([]))
        );
      })
    );
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  searchCities(term: string): Observable<any[]> {
    return new Observable((observer) => {
      const searchValue = term.toLowerCase();
      const allCountries = Country.getAllCountries();
      const filteredCities: any[] = [];

      setTimeout(() => {
        allCountries.forEach((country) => {
          const states = State.getStatesOfCountry(country.isoCode);
          states.forEach((state) => {
            const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
            const matchingCities = cities.filter((city) =>
              city.name.toLowerCase().includes(searchValue)
            );
            filteredCities.push(
              ...matchingCities.map((city) => ({
                name: city.name,
                state: state.name,
                country: country.name,
              }))
            );
          });
        });
        observer.next(filteredCities);
        observer.complete();
      }, 0);
    });
  }

  displayFn(city: any): string {
    return city && city.name ? `${city.name}, ${city.state}, ${city.country}` : '';
  }

  onCitySelected(city: any) {
    this.selectedCity = city; // Atualiza a cidade selecionada
  }
}
