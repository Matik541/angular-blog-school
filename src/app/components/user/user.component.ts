import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { User } from 'src/app/interfaces/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user: User | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.userService.getUser(params['id']).subscribe((user) => {
        this.user = user;
      });
    });
  }
}
