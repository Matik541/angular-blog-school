import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { GlobalsService } from 'src/app/globals.service';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService
  ) { 
    this.apiUrl = `${globals.baseUrl}/users`;
  }

  getUser(id: string): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap((user) => user),
      catchError((err) => of(null))
    ) as Observable<User | null>;
  }
    
}
