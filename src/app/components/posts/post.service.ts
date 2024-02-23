import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { GlobalsService } from 'src/app/globals.service';
import { Post } from 'src/app/interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl;

  constructor(
    private http: HttpClient, 
    public globals: GlobalsService
    ) {
    this.apiUrl = `${globals.baseUrl}/posts`;
  }

  
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/`);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  
  create(title: string, text: string): Observable<Post | null> {
    return this.http.post<Post>(
      `${this.apiUrl}/`,
      {
        title,
        text,
      },
      { headers: { Authorization: `Bearer ${this.globals.accessToken}` } }
    ).pipe(
      tap((post) => post),
      catchError((err) => of(null))
    ) as Observable<Post | null>;
  }

  edit(id: string, title: string, text: string): Observable<Post> {
    return this.http.put<Post>(
      `${this.apiUrl}/${id}`,
      {
        title,
        text,
      },
      { headers: { Authorization: `Bearer ${this.globals.accessToken}` } }
    );
  }

  delete(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${this.globals.accessToken}` },
    });
  }
}
