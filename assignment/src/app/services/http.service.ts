import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getRegion() {
    return this.http.get('https://api.first.org/data/v1/countries').pipe(
      map((data) => {
        return data;
      })
    );
  }
}
