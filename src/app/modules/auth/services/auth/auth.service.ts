import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { LoginForm, LoginResponse } from '../../models/login.model';
import { tap } from 'rxjs';
import { RegisterForm, RegisterResponse } from '../../models/register.model';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService,
    private tokenService: TokenService,
    private router: Router,
    private userAuthService: UserAuthService
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
    this.tokenService.removeToken();
    this.userAuthService.verifyAuth()
    this.router.navigate(['/'])
  }
}
