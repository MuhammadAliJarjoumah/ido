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
}
