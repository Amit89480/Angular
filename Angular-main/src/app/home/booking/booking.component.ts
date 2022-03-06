import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../home.service";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
})
export class BookingComponent implements OnInit {
  constructor(
    private service: HomeService,
    private activateRoute: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router
  ) {}

  bookingForm: FormGroup = null;
  user = JSON.parse(localStorage.getItem("user"));

  ngOnInit(): void {
    this.bookingForm = this.builder.group({
      uid: this.user.dbUserId,
      tid: [''],
      payment_mode: [""],
      price: [''],
      depature_date: [''],
      depature_time: [''],
      datetime: [''],
      pnr_no: [''],
      status: 0,
    });
    let tid = this.activateRoute.snapshot.paramMap.get("tid");
    this.service.getTrain(tid).subscribe(res => {
      this.bookingForm.patchValue({
        tid: tid,
        price: res.price,
        depature_time: res.depature_time ? res.depature_time : '00:00',
        datetime: new Date(),
      });
    }, err => console.log(err));
    
  }
  
  onSubmit() {
    this.service.createBooking(this.bookingForm.value).subscribe(
      res => {
        this.router.navigate(['payment', res.name]);
      },
      err => console.log(err)
    )
  }
}
