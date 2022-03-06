import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-edit-train',
  templateUrl: './edit-train.component.html',
  styleUrls: ['./edit-train.component.css']
})
export class EditTrainComponent implements OnInit {

  constructor(
    private router: Router,
    private service: TrainService,
    private builder: FormBuilder,
    private activateRoute: ActivatedRoute
  ) { }

  tid = null;
  train = null;
  trainForm: FormGroup = null;

  ngOnInit(): void {
    this.trainForm = this.builder.group({
      name: [''],
      number: [''],
      source: [''],
      destination: [''],
      depature_time: [''],
      price: [''],
      status: ['']
    });
    this.tid = this.activateRoute.snapshot.paramMap.get('id');
    this.service.getTrain(this.tid).subscribe(
      result => {
        this.trainForm.patchValue({
          name: result.name,
          number: result.number,
          source: result.source,
          destination: result.destination,
          depature_time: result.depature_time,
          price: result.price,
          status: result.status
        });
      }, err => console.log(err)
    )
  }

  onSubmit() {
    this.service.updateTrain(this.tid, this.trainForm.value).subscribe(
      result => {
        alert("train data updated!");
        this.router.navigate(['../admin/train']);
      },
      err => console.log(err)
    );
  }
}

