import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  user = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    if (!this.user) {
      this.user = {
        type: null
      };
    }
  }
  logout() {
    localStorage.clear();
    this.user = {
      type: null
    };
    this.router.navigate(['/']);
  }

}
