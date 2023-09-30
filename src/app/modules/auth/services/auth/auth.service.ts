import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { LoginForm, LoginResponse } from '../../models/login.model';
import { tap } from 'rxjs';
import { RegisterForm, RegisterResponse } from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService,
    private tokenService: TokenService
  ) { }

  login(data: LoginForm) {
    return this.http.post<LoginResponse>(`login`, data)
      .pipe(
        //TODO: revisar manejo de errores
        tap(response => this.tokenService.saveToken(response.access_token))
      )
  }

  register(data: RegisterForm) {
    return this.http.post<RegisterResponse>(`register`, data)
  }

  logout() {
    return this.http.get<any>(`logout`)
      .pipe(
        tap(() => this.tokenService.removeToken())
      )
  }
}
