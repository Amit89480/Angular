import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AdminGuard],
    component: AdminHomepageComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UserModule) 
      },
      {
        path: 'train',
        loadChildren: () => import('./train/train.module').then(m => m.TrainModule)
      }, 
      {
        path: 'booking',
        loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule)
      },
      {
        path: 'enquiry',
        loadChildren: () => import('./enquiry/enquiry.module').then(m => m.EnquiryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
