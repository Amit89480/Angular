import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent } from './log-in/log-in.component';

import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path:'register',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
