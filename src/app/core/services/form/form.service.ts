import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Errors } from '../../models/errors.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  setErrors(form: FormGroup, errors: Errors) {
    form.markAllAsTouched()
    Object.keys(form.controls).forEach((key: string) => {
      let error = errors[key]
      if (error && error.length >= 1) {
        form.controls[key].setErrors({ invalid: error[0] })
      }
    });

    return form
  }
}
