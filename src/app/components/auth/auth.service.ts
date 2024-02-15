import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

import { Observable, catchError, of, tap } from 'rxjs';
import { User } from 'src/app/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute 
  ) { }

  register(username: string, password: string, email: string): Observable<User | null> {
    return this.http.post<User>(`${this.API_URL}/register`, {
      username,
      password,
      email
    }).pipe(
      tap((data) => data),
      catchError((err) => {
        console.log(err)
        return of(null);
      }),
    )
  }

  login(username: string, password: string): Observable<User | null> {
    return this.http.post<User>(`${this.API_URL}/login`, {
      username,
      password
    }).pipe(
      tap((data) => data),
      catchError((err) => {
        console.log(err)
        return of(null);
      }),
    );
  }

  logout() {
    
  }

  refreshToken() {
  
  }
}
