import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
    
    constructor(
      private activeRoute: ActivatedRoute,
    ) { }
  
    ngOnInit(): void {
      this.activeRoute.params.subscribe((params) => {
        console.log(params["id"]);
      });
    }
}
