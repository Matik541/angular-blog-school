import { Post } from './../../../interfaces/post';
import { PostService } from './../post.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  
  createForm: FormGroup;
  asEdit: boolean = false;

  post?: Post;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50) ]],
      text: ['', [Validators.required, Validators.maxLength(2000) ]],
    });

    this.activatedRoute.url.subscribe(urlSegments => {
      if (urlSegments[0].path === 'edit') {
        this.asEdit = true;

        this.activatedRoute.params.subscribe((params) => {
          this.postService.getPost(params['id']).subscribe((post) => {
            this.post = post;

            this.createForm.setValue({
              title: post.title,
              text: post.text,
            });
          });
        });
      }

    });

  }

  createPost() {  
    if (this.createForm.invalid) return;

    if (this.asEdit && this.post) {
      this.postService.edit(this.post._id, this.createForm.value.title, this.createForm.value.text).subscribe(
        (post) => {
          this.router.navigate(['/post', post?._id]);
        }
      );
      return;
    }

    this.postService.create(this.createForm.value.title, this.createForm.value.text).subscribe(
      (post) => {
        console.log(post);
        this.router.navigate(['/post', post?._id]);
      }
    );
  }
}
