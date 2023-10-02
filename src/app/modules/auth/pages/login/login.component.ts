import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginErrors } from '../../models/login.model';
import { FormService } from 'src/app/core/services/form/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    public notificationService: NotificationService,
    private formService: FormService,
  ) { }

  showPassword: boolean = true;

  form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  })

  errors: LoginErrors = {}

  loading: boolean = false;

  login() {
    if (this.form.valid) {
      this.loading = true
      this.authService.login(this.form.getRawValue())
        .subscribe({
          next: response => {
            this.loading = false
            this.router.navigate(['/my-products'])
          },
          error: error => {
            this.loading = false
            if (error.status === 422) {
              this.errors = error.error.errors
              this.formService.setErrors(this.form, this.errors)
            }
            else {
              this.notificationService.error('Incorrect email or password')
            }
          }
        })
    } else {
      this.form.markAllAsTouched()
    }
  }

  goRegister() {
    this.router.navigate(['register'])
  }
}
