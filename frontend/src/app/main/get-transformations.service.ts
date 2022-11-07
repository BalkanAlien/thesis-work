import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTransformationsService {

  uri: string = "http://localhost:3000/import";
  constructor(private http: HttpClient) { }

  getTransformedCannedMessages(accountId: number, apiKey: string): Observable<any> {
    return this.http.get(`${this.uri}?accountId=${accountId}&apiKey=${apiKey}`);
  }
}
