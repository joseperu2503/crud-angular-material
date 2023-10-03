import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuthService)
  const router = inject(Router)

  // console.log('authguard')

  const isValid = userAuthService.verifyAuth()
  if (!isValid) {
    router.navigate(['/login'])
  }
  return true;
};
