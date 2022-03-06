import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/features/authentication/registration/service.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUsersComponent implements OnInit {

  constructor(
    public service:ServiceService,
  ) { }

usersData:any=[];
userId:string="";

  ngOnInit(): void {
    this.fetchUsersData();
  }
 fetchUsersData(){
   this.service.getUsers().subscribe(
     (     result): void =>{
       console.log(result);
       this.usersData=result
     },
    error =>console.log(error)
   );

    }
}