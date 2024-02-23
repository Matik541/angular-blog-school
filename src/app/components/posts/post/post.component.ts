import { Post } from 'src/app/interfaces/post';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  post: Post | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private postService: PostService  
  ) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.postService.getPost(params['id']).subscribe((post) => {
        this.post = post;
      });
    });
  }
}
