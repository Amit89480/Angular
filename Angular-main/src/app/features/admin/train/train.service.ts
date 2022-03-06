import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(private http: HttpClient) { }

  table_name = "trains.json";

  addTrain(train) {
    return this.http.post(environment.apiUrl + this.table_name, train);
  }
  getTrain(id) {
    return this.http.get<any>(environment.apiUrl + "trains/"+id+".json");
  }
  getTrains() {
    return this.http.get(environment.apiUrl + this.table_name).pipe(
      map(res => {
        const arr = [];
        for (const r in res) {
          if (res.hasOwnProperty(r)) {
            arr.push({ ...res[r], id: r })
          }
        }
        return arr;
      }));
  }
  updateTrain(tid, train) {
    return this.http.put(environment.apiUrl + "trains/" + tid + ".json", train);
  }
}
