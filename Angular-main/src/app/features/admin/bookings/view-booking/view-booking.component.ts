import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  constructor(private service: BookingService) { }

  bookings = [];

  ngOnInit(): void {
    this.service.getBookings().subscribe(
      result => this.bookings = result
    );
  }

}
