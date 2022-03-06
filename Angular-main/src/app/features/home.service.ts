import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  private table_name: string="enquiries.json"

     createData(enquiry:any){
    return this.http.post(environment.apiUrl + this.table_name,enquiry);
    }
  
}
