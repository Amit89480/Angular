import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from './service.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {



  constructor(
    public service: ServiceService,
    private builder: FormBuilder,

    private router:Router

  ) { }
  userFrom: FormGroup = new FormGroup({});
  userFromId: string ="";

  ngOnInit(): void {
    this.userFrom = this.builder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      gender: [''],
      dob: [''],
      type: 'user',
      password: '12345678'

    });
  }
  saveData() {
    // this.userFrom.value.password = this.encPwd.encrypt(this.userFrom.value.password);
    this.service.checkEmail().subscribe(users => {
      let u = users.find(o => o.email == this.userFrom.value.email);
      if (u) {
        alert("Email already used");
        this.userFrom.value.email = "";
      } else {
        this.service.addUser(this.userFrom.value).subscribe(user => {
          this.service.signUpUser(this.userFrom.value.email, this.userFrom.value.password).subscribe(r => {
            alert('User Registration Complete');
          }, err => console.log(err))
        }, err => console.log(err))
      }
    }, err => console.log(err));
  }
      }
