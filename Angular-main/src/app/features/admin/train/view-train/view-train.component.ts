import { Component, OnInit } from '@angular/core';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-view-train',
  templateUrl: './view-train.component.html',
  styleUrls: ['./view-train.component.css']
})
export class ViewTrainComponent implements OnInit {

  constructor(private service: TrainService) { }

  trains = [];

  ngOnInit(): void {
    this.service.getTrains().subscribe(result => {
      this.trains = result
    }, err => console.log(err));
  }

}
