import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-page-content',
  templateUrl: './home-page-content.component.html',
  styleUrls: ['./home-page-content.component.css']
})
export class HomePageContentComponent implements OnInit {

  constructor(
    private service: HomeService,
    private builder: FormBuilder,
    private router: Router
    ) { }

  sources = [];
  destinations = [];
  trainEnquiryForm: FormGroup = null;

  ngOnInit(): void {
    this.trainEnquiryForm = this.builder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.service.getTrains().subscribe(
      result => {
        if(Array.isArray(result)) {
          for (const train of result) {
            this.sources.push(train.source);
            this.destinations.push(train.destination);
          }
        }
        this.sources = [...new Set(this.sources)];
        this.destinations = [...new Set(this.destinations)];
      },
      err => console.log(err)
    )
  }
  onSubmit() {
    let source = this.trainEnquiryForm.value.source;
    let destination = this.trainEnquiryForm.value.destination;
    let date = this.trainEnquiryForm.value.date;
    this.router.navigate(['view-train', source, destination, date]);
  }

}
