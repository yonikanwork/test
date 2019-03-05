import { Component, OnInit, Inject } from '@angular/core';
import { PostsService } from '../posts.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-post-delete-dialog',
  templateUrl: './post-delete-dialog.component.html',
  styleUrls: ['./post-delete-dialog.component.scss']
})
export class PostDeleteDialogComponent implements OnInit {

  constructor(public postsService: PostsService, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onDeletePost(id) {
    this.postsService.deletePost(id);
    this.dialogRef.close();
  }
}
