import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {LoginComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication.component';


@NgModule({
  declarations: [
  LoginComponent,
    RegistrationComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AuthenticationModule { }
