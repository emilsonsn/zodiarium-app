import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from "@env/environment";

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly apiUrl = `${environment.api}/city}`;

  constructor(private http: HttpClient) {}

  /**
   * Busca cidades com base em um termo de pesquisa.
   * @param term - Termo de pesquisa.
   * @returns Observable contendo uma lista de cidades filtradas.
   */
  searchCities(term: string): Observable<City[]> {
    const params = { q: term }; // Substitua 'q' pelo parâmetro adequado, se necessário
    return this.http.get<City[]>(this.apiUrl, { params }).pipe(
      map((cities) => cities.filter((city) => city.name.toLowerCase().includes(term.toLowerCase())))
    );
  }

  /**
   * Busca informações de uma cidade específica por ID.
   * @param id - ID da cidade.
   * @returns Observable com os detalhes da cidade.
   */
  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${id}`);
  }
}
