import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../enquiry.service';

@Component({
  selector: 'app-view-enquiry',
  templateUrl: './view-enquiry.component.html',
  styleUrls: ['./view-enquiry.component.css']
})
export class ViewEnquiryComponent implements OnInit {

  constructor(
    public service:EnquiryService
  ) { }
  enquiryData:any=[];
  enquiryId:string="";
  ngOnInit(): void {
    this.fetchEnquiryData();
  }
  fetchEnquiryData(){
    this.service.getData().subscribe(
      result => {
        console.log(result);
        this.enquiryData = result
      },
      error => console.log(error)
      );
  }
}


