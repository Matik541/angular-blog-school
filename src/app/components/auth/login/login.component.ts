import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    
    constructor(
      private authService: AuthService
    ) { 

      this.login('test', 'test');
    }
    
    login(username: string, password: string) {
      this.authService.login(username, password).subscribe((res) => {
        console.log(res);
      });
    }
}
