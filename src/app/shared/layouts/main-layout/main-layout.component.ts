import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth/user-auth.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  @ViewChild('drawer') drawer?: MatDrawer;

  constructor(
    private authService: AuthService,
    private useAuthService: UserAuthService,
    private router: Router
  ) { }

  menuItems = [
    {
      label: 'Home',
      url: '/',
      icon: 'home'
    },
    {
      label: 'My Products',
      url: '/my-products',
      icon: 'store'
    },
    {
      label: 'New Product',
      url: '/create-product',
      icon: 'add'
    }
  ]

  logout() {
    this.authService.logout()
    this.toggleDrawer()
  }

  goRegister() {
    this.router.navigate(['register'])
  }

  goLogin() {
    this.router.navigate(['login'])
  }

  get user() {
    return this.useAuthService.userAuth;
  }

  toggleDrawer() {
    this.drawer?.toggle()
  }
}
