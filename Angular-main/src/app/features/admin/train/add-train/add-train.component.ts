import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-add-train',
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css']
})
export class AddTrainComponent implements OnInit {

  constructor(
    private router: Router,
    private service: TrainService,
    private builder: FormBuilder
  ) { }

  trainForm: FormGroup = null;

  ngOnInit(): void {
    this.trainForm = this.builder.group({
      name: [''],
      number: [''],
      source: [''],
      destination: [''],
      depature_time: [''],
      price: [''],
      status: 1
    });
  }

  onSubmit() {
    this.service.addTrain(this.trainForm.value).subscribe(
      result => {
        alert("new train added");
        this.router.navigate(['../admin/train']);
      },
      err => console.log(err)
    )
  }

}
