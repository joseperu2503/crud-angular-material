import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(
    private authService: AuthService
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
  }
}
