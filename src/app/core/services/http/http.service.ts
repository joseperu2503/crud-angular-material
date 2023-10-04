import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl = `${environment.APP_API_URL}`

  get<T>(query: string) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.get<T>(url)
  }

  post<T>(query: string, body: any) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.post<T>(url, body)
  }

  put<T>(query: string, body: any) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.put<T>(url, body)
  }

  delete<T>(query: string) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.delete<T>(url)
  }
}
