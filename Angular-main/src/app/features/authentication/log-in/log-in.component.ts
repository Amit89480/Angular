import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../registration/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private builder: FormBuilder, private service: ServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const authData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true,
    };
    this.service.loginUser(authData.email, authData.password).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error.error.error.code, error.error.error.message);
      }
    );
  }
}
