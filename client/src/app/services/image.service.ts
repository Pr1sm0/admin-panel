import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/v1/images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  get(itemId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${itemId}`);
  }

  getAll(itemId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${itemId}/all`);
  }
}