import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private http: HttpClient) { }
  private table_name: string="enquiries.json"

  getData() {
    return this.http.get<any>(environment.apiUrl + this.table_name).pipe(
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