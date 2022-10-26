import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetMessagesService {

  uri: string = "http://localhost:3000/export";
  constructor(private http: HttpClient) { }

  getCannedMessages(accountId: number, apiKey: string): Observable<any> {
    return this.http.get(`${this.uri}?accountId=${accountId}&apiKey=${apiKey}`);
  }
}
