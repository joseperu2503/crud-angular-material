import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

export const redirectGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const tokenService = inject(TokenService)
  console.log('redirect')

  const isValidToken = tokenService.isValidToken()
  if (isValidToken) {
    router.navigate(['/my-products'])
  }

  return true;
};
