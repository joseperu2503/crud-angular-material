import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserAuthService } from '../../services/user-auth/user-auth.service';

export const verifyAuthGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuthService)

  userAuthService.verifyAuth()
  return true;
};
