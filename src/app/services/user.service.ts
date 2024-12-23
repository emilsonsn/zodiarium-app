import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '@env/environment';
import { ApiResponse, ApiResponsePageable, DeleteApiResponse, PageControl } from '@models/application';
import { User } from '@models/user';
import { Utils } from '@shared/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private sessionEndpoint: string = 'user';

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  public getUsers(pageControl?: PageControl, filters?): Observable<ApiResponsePageable<User>> {
    const paginate = Utils.mountPageControl(pageControl);
    const filterParams = Utils.mountPageControl(filters);

    return this._http.get<ApiResponsePageable<User>>(`${environment.api}/${this.sessionEndpoint}/search?${paginate}${filterParams}`);
  }

  public getUser(): Observable<ApiResponse<User>> {
    return this._http.get<ApiResponse<User>>(`${environment.api}/${this.sessionEndpoint}/me`);
  }

  public getUserById(id: number): Observable<ApiResponse<User>> {
    return this._http.get<ApiResponse<User>>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }

  public postUser(user: User): Observable<ApiResponse<User>> {
    return this._http.post<ApiResponse<User>>(`${environment.api}/${this.sessionEndpoint}/create`, user);
  }

  // return this._http.post<ApiResponse<User>>(`${environment.api}/open/user/${token}`, user);

  public patchUser(id: number, user: FormData): Observable<ApiResponse<User>> {
    return this._http.post<ApiResponse<User>>(`${environment.api}/${this.sessionEndpoint}/${id}?_method=PATCH`, user);
  }

  public deleteUser(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }


  recoverPassword(email: string): Observable<any> {
    return this._http.post<any>(`${environment.api}/recoverPassword`, {email});
  }

  public resetPassword(token: string, password: string): Observable<ApiResponse<string>> {
    return this._http.post<ApiResponse<string>>(`${environment.api}/open/${this.sessionEndpoint}/reset-password/${token}`, {password: password});
  }

  public validateCode(code: string): Observable<ApiResponse<string>> {
    return this._http.post<ApiResponse<string>>(`${environment.api}/validate-code?_method=GET`, {code})
  }

  public validateToken(token: string): Observable<ApiResponse<string>> {
    return this._http.post<ApiResponse<string>>(`${environment.api}/open/${this.sessionEndpoint}/check-token`, {token: token})
  }

  getUsersAll() {
    return this._http.get<ApiResponse<User[]>>(`${environment.api}/${this.sessionEndpoint}/all`);
  }

  updatePassword(data: { code: string, password: string }): Observable<any> {
    return this._http.post<any>(`${environment.api}/updatePassword`, data);
  }
}
