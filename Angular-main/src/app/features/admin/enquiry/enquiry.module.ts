import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiryRoutingModule } from './enquiry-routing.module';
import { ViewEnquiryComponent } from './view-enquiry/view-enquiry.component';


@NgModule({
  declarations: [
    ViewEnquiryComponent
  ],
  imports: [
    CommonModule,
    EnquiryRoutingModule
  ]
})
export class EnquiryModule { }
