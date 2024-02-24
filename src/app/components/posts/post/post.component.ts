import { Post } from 'src/app/interfaces/post';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  post: Post | undefined;
  isAuthor: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.postService.getPost(params['id']).subscribe((post) => {
        this.post = post;

        this.isAuthor =
          this.postService.globals.user?._id === this.post?.author._id;
      });
    });
  }

  deletePost() {
    if (!this.post) return;
    this.postService.delete(this.post._id).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
