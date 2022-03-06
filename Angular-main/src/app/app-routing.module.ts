import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/features/authentication/authentication.module').then(m => m.AuthenticationModule) // lazy loading
  },
  {
    path: 'admin',
    loadChildren: ()=> import('./features/admin/admin.module').then(m=> m.AdminModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
