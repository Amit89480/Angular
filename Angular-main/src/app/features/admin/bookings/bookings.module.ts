import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ViewBookingComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    HttpClientModule
  ]
})
export class BookingsModule { }
