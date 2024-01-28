import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    console.log('submit function called', this.form.value);
  }
}
