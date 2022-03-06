import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-view-trains',
  templateUrl: './view-trains.component.html',
  styleUrls: ['./view-trains.component.css']
})
export class ViewTrainsComponent implements OnInit {

  constructor(
    private service: HomeService,
    private activateRoute: ActivatedRoute
  ) { }

  trains = [];
  source = null;
  destination = null;
  date = null;

  ngOnInit(): void {
    this.source = this.activateRoute.snapshot.paramMap.get("source");
    this.destination = this.activateRoute.snapshot.paramMap.get("destination");
    this.date = this.activateRoute.snapshot.paramMap.get("date");
    this.service.getTrains().subscribe(
      result => {
        this.trains = result.filter(o => {
          if(o.source == this.source && o.destination == this.destination) {
            return true;
          }
          return false;
        });
      },
      err => console.log(err)
    )
  }

}
