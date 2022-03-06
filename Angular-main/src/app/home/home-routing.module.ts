import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTrainsComponent } from './view-trains/view-trains.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingComponent } from './booking/booking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomePageContentComponent } from './home-page-content/home-page-content.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { UserGuard } from './user.guard';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomePageContentComponent
      },
      {
        path: 'about',
        component: AboutUsComponent
      },
      {
        path: 'contact',
        component: ContactUsComponent
      },
      {
        path: 'view-train/:source/:destination/:date',
        component: ViewTrainsComponent
      },
      {
        path: 'booking/:tid',
        canActivate:[UserGuard],
        component: BookingComponent
      },
      {
        path: 'payment/:bid',
        canActivate: [UserGuard],
        component: PaymentComponent
      },
      {
        path: 'profile',
        canActivate: [UserGuard],
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
