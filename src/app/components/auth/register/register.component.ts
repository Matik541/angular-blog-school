import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService
  ) { 
    this.register('test123', 'test123', 'test123@test.test');
  }

  register(username: string, password: string, email: string) {
    this.authService.register(username, password, email).subscribe((res) => {
      console.log(res);
    });
  }
}
