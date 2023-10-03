import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth/user-auth.service';

export const redirectGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const userAuthService = inject(UserAuthService)

  // console.log('redirect')

  const isValid = userAuthService.verifyAuth()
  if (isValid) {
    router.navigate(['/my-products'])
  }

  return true;
};
