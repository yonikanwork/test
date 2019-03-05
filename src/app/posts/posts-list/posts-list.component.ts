import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Subscription, Observable } from 'rxjs';

import { MatDialog } from '@angular/material';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postsSubscription: Subscription;

  constructor(public postsService: PostsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostsUpdateListener()
      .subscribe((posts) => {
        // console.log('posts: ', posts);
        this.isLoading = false;
        this.posts = posts;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '500px',
      height: '320px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
