import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login'
  }
]

@NgModule({
  declarations: [

    LoginComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class AuthenticationModule { }
