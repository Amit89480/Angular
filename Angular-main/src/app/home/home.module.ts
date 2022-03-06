import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomePageContentComponent } from './home-page-content/home-page-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewTrainsComponent } from './view-trains/view-trains.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    AboutUsComponent,
    ContactUsComponent,
    HomePageContentComponent,
    BookingComponent,
    ProfileComponent,
    ViewTrainsComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class HomeModule { }
