import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainRoutingModule } from './train-routing.module';
import { ViewTrainComponent } from './view-train/view-train.component';
import { AddTrainComponent } from './add-train/add-train.component';
import { EditTrainComponent } from './edit-train/edit-train.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ViewTrainComponent,
    AddTrainComponent,
    EditTrainComponent
  ],
  imports: [
    CommonModule,
    TrainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class TrainModule { }
