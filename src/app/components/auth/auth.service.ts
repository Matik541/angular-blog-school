import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, tap } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { GlobalsService } from 'src/app/globals.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public globals: GlobalsService
  ) {
    this.apiUrl = `${globals.baseUrl}/auth`;

    this.refreshToken();
    if (this.cookieService.check('accessToken')) {
      this.globals.accessToken = this.cookieService.get('accessToken');
      this.globals.user = jwtDecode(this.globals.accessToken);
    }
  }

  register(
    username: string,
    password: string,
    email: string
  ): Observable<User | null> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.apiUrl}/register`,
        {
          username,
          password,
          email,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((token) => this.decodeToken(token.accessToken)),
        catchError((err) => of(null) )
      ) as Observable<User | null>;
  }

  login(username: string, password: string): Observable<User | null> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.apiUrl}/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((token) => this.decodeToken(token.accessToken)),
        catchError(() => of(null))
      ) as Observable<User | null>;
  }

  logout(): void {
    this.refreshToken();

    this.cookieService.delete('accessToken');
    this.globals.user = undefined;

    if (!this.globals.accessToken) return;
    
    this.http.post(`${this.apiUrl}/logout`, null, {
      headers: { Authorization: `Bearer ${this.globals.accessToken}` },
      withCredentials: true,
    }).subscribe();
    
    this.globals.accessToken = '';
  }

  refreshToken(): void {
    this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/refresh_token`, null, {
        withCredentials: true,
      }).subscribe(
        (token) => this.decodeToken(token.accessToken), 
        (err) => console.log(err.statusText, err.error.message),
      );
  }

  private decodeToken(token: string): User {
    this.cookieService.set('accessToken', token, (1 / 24 / 60) * 5);
    this.globals.accessToken = token;
    let decoded: any = jwtDecode(token);
    this.globals.user = {
      _id: decoded.sub,
      username: decoded.username,
    }
    return jwtDecode(token);
  }
}
