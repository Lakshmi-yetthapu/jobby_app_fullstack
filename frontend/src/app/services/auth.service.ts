import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  url = 'http://localhost:3000';

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  loginUser(user: any) {
    return this.http.post<any>(`${this.url}/login`, user);
  }

  signinUser(user: any) {
    return this.http.post<any>(`${this.url}/signup`, user);
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
