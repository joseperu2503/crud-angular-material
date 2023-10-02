import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { FormService } from 'src/app/core/services/form/form.service';
import { RegisterErrors } from '../../models/register.model';
import { ErrorStateMatcher } from '@angular/material/core';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control?.touched && form?.invalid && (control.hasError('required') || form.hasError('match_password'))) ?? true;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    public notificationService: NotificationService,
    private formService: FormService,
  ) { }

  showPassword: boolean = true;

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password_confirmation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  }, {
    validators: [this.matchPasswords]
  })

  errors: RegisterErrors = {}

  loading: boolean = false;

  errorMatcher = new CrossFieldErrorMatcher();

  register() {
    if (this.form.valid) {
      this.loading = true
      this.authService.register(this.form.getRawValue())
        .subscribe({
          next: response => {
            this.authService.login({
              email: this.form.getRawValue().email,
              password: this.form.getRawValue().password
            }).subscribe({
              next: response => {
                this.loading = false
                this.router.navigate(['/my-products'])
              },
              error: error => {
                this.loading = false
                this.notificationService.error('An error occurred. Please try again.');
              }
            })
          },
          error: error => {
            this.loading = false
            if (error.status === 422) {
              this.errors = error.error.errors
              this.formService.setErrors(this.form, this.errors)
            }
            else {
              this.notificationService.error('An error occurred. Please try again.');
            }
          }
        })
    } else {
      this.form.markAllAsTouched()
    }
  }

  goLogin() {
    this.router.navigate(['login'])
  }

  matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password_confirmation')?.value;

    if (password === confirmPassword) {
      return null;
    }
    return { 'match_password': true };
  }
}
