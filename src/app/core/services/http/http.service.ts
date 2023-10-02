import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  private apiUrl = `${environment.APP_API_URL}`

  post<T>(query: string, body: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });

    const url = `${this.apiUrl}/${query}`;
    return this.http.post<T>(url, body, { headers })
  }

  get<T>(query: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });

    const url = `${this.apiUrl}/${query}`;
    return this.http.get<T>(url, { headers })
  }

  put<T>(query: string, body: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });

    const url = `${this.apiUrl}/${query}`;
    return this.http.put<T>(url, body, { headers })
  }

  delete<T>(query: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });

    const url = `${this.apiUrl}/${query}`;
    return this.http.delete<T>(url, { headers })
  }

  getToken() {
    return this.tokenService.getToken()
  }
}
