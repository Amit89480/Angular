import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTrainComponent } from './add-train/add-train.component';
import { EditTrainComponent } from './edit-train/edit-train.component';
import { ViewTrainComponent } from './view-train/view-train.component';

const routes: Routes = [
  {
    path: '',
    component: ViewTrainComponent
  },
  {
    path: 'add-train',
    component: AddTrainComponent
  },
  {
    path: 'edit-train/:id',
    component: EditTrainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainRoutingModule { }
