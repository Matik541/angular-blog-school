import { PostService } from './../post.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AppComponent } from 'src/app/app.component';
import { GlobalsService } from 'src/app/globals.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  
  createForm: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private globals: GlobalsService
  ) {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required ]],
      text: ['', [Validators.required ]],
    });
  }

  createPost() {  
    if (this.createForm.invalid) return;
    this.postService.create(this.createForm.value.title, this.createForm.value.text).subscribe(
      (post) => {
        console.log(post);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
