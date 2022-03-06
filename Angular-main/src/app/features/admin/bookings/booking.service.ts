import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }
  
  getBookings() {
    return this.http.get<any>(environment.apiUrl + "reservations.json").pipe(
      map(res => {
        let arr = [];
        for(const r in res) {
          if (res.hasOwnProperty(r)) {
            arr.push({ ...res[r], id: r });
          }
        }
        return arr;
      })
    );
  }
}
