import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  posts: Post[] = [];

  constructor(
    private postService: PostService
  ) {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnInit(): void {
    
  }
}
