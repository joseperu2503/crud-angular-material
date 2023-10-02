import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const authService = inject(AuthService)

  console.log('authguard')
  const isValidToken = tokenService.isValidToken()
  if (!isValidToken) {
    authService.logout()
  }
  return true;
};
