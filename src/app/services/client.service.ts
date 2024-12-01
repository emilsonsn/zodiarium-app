import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponsePageable, PageControl } from '@models/application';
import { Client } from '@models/client';
import { Utils } from '@shared/utils';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly baseUrl = `${environment.api}/client`;

  constructor(private readonly _http: HttpClient) { }

  getBanks(pageControl?: PageControl, filters?: any): Observable<ApiResponsePageable<Client>> {

    let filterParams = '';
    if(filters) filterParams = Utils.mountPageControl(filters);

    return this._http.get<ApiResponsePageable<Client>>(`${this.baseUrl}/search?${filterParams}`);
  }

  // Get a funnel step by ID
  getById(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
}
