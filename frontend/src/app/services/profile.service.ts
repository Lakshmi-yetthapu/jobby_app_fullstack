import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 private apiUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, userData);
  }
}
