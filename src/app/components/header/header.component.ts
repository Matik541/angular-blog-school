import { AuthService } from './../auth/auth.service';
import { GlobalsService } from 'src/app/globals.service';
import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    public globals: GlobalsService
  ) { }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
