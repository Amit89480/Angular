import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    component: ViewUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
