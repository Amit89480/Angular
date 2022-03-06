import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private table_name = "reservations.json";

  createBooking(booking) {
    return this.http.post<any>(environment.apiUrl + this.table_name, booking);
  }
  newPayment(payment) {
    return this.http.post<any>(environment.apiUrl + "payments.json", payment);
  }

  getBookings() {
    return this.http.get<any>(environment.apiUrl + this.table_name);
  }
  getTrains() {
    return this.http.get(environment.apiUrl + 'trains.json').pipe(
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
  getResearvations() {
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
  getTrain(tid): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'trains/' +tid + '.json');
  }
  getBookingDetail(bid) {
    return this.http.get<any>(environment.apiUrl + 'reservations/' +bid + '.json');
  }
  updateBookingDetails(bid, booking) {
    return this.http.put(environment.apiUrl + 'reservations/' +bid + '.json', booking);
  }
  getUserDetails(uid) {
    return this.http.get<any>(environment.apiUrl + 'register/' +uid+ '.json');
  }


}
