import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onLogin() {
    if (this.form.valid) {
      // console.log('submit function called', this.form.value);
      this._authenticationService.login(this.form.value).subscribe({
        next: (response) => {
          console.log("response:", response);
        },
        error: (error) => {
          console.error("error:", error);
        }
      })
    }
  }

  private validateAllFormFields() {

  }
}
