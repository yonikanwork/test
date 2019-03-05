import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatDialog } from '@angular/material';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';
import { PostDeleteDialogComponent } from '../post-delete-dialog/post-delete-dialog.component';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  isLoading = false;
  postData;
  private postId: string;

  constructor( public postsService: PostsService, public route: ActivatedRoute, public dialog: MatDialog ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          // console.log('postData: ', postData);
          this.isLoading = false;
          this.postData = postData;
          // console.log('this.postData: ', this.postData);
        });
      } else {
        this.postId = null;
      }
    });
  }

  onUpdatePost() {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '500px',
      height: '320px',
      data: {
        _id: this.postData._id,
        title: this.postData.title,
        content: this.postData.content,
        imagePath: this.postData.imagePath
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  onDeletePost() {
    const dialogRef = this.dialog.open(PostDeleteDialogComponent, {
      width: '500px',
      height: '250px',
      data: {_id: this.postData._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
