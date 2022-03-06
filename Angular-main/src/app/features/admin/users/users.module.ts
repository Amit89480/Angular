import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ViewUsersComponent } from './view-user/view-user.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
   ViewUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule
  ]
})
export class UserModule { }
