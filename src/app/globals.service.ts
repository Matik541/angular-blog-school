import { Injectable } from '@angular/core';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  title = 'Blog';
  accessToken?: string;
  user?: User;
  baseUrl = 'http://localhost:3000/api';
  
  constructor() { }
}
