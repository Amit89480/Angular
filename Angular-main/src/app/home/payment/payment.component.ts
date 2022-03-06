import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../home.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  constructor(
    private service: HomeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder
  ) {}

  paymentForm: FormGroup = null;
  bookingDetails = null;
  cardForm: FormGroup = null;

  ngOnInit(): void {
    this.cardForm = this.builder.group({
      card_number: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      name: ['', Validators.required],
      exp_month: ['', Validators.required],
      exp_year:['', Validators.required],
      ccv: ['', Validators.required]
    });
    this.paymentForm = this.builder.group({
      bid: [""],
      price: [""],
      payment_mode: [""],
      datetime: [""],
      status: 1,
    });
    let bid = this.activeRoute.snapshot.paramMap.get("bid");
    this.service.getBookingDetail(bid).subscribe(
      (res) => {
        this.bookingDetails = res;
        this.paymentForm.patchValue({
          bid: bid,
          payment_mode: "card",
          price: res.price,
          datetime: new Date(),
        });
      },
      (err) => console.log(err)
    );
  }
  onSubmit() {
    this.service.newPayment(this.paymentForm.value).subscribe(
      (res) => {
        this.bookingDetails.status = 1;
        this.bookingDetails.pnr_no = this.generatePNRNumber();
        this.service.updateBookingDetails(this.paymentForm.value.bid, this.bookingDetails).subscribe(
          r => {
            alert("Payment Done");
            this.router.navigate(['']);
        },
          err => console.log(err)
        )
      },
      (err) => console.log(err)
    );
  }
  handleCardNumber(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  generatePNRNumber() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
