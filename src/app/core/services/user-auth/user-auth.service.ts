import { Injectable } from '@angular/core';
import { UserAuth } from '../../models/user-auth.interface';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private tokenService: TokenService
  ) { }

  userAuth: UserAuth | null = null

  verifyAuth() {
    // console.log('verifyAuth')

    const { isValid, decodedToken } = this.tokenService.validateToken()

    if (isValid) {
      this.userAuth = {
        name: decodedToken.name,
        id: decodedToken.id,
        email: decodedToken.email
      }
    } else {
      this.userAuth = null;
      this.tokenService.removeToken()
    }

    return isValid;
  }
}
