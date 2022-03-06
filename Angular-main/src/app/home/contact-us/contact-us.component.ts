import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/features/home.service';
// import { ServiceService } from '../../authentication/service.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  [x: string]: any;

  user: FormGroup = new FormGroup({});
  userId: string="";

  constructor(
    public service:HomeService,
    private builder:FormBuilder
  ) { }

  ngOnInit(): void {

  this.user = this.builder.group({
    name: [''],
    email: [''],
    message: [''],
  });
  }

onSubmit(): void {
  
  this.service.createData(this.user.value).subscribe(
        result => {
      console.log("Result:-",result);},
      error => { 
        console.log("Error:- ", error);
    
    });
  }
}
  



