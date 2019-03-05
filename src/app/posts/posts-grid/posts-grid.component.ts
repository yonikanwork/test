import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription, pipe } from 'rxjs';
import { PostsService } from '../posts.service';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.scss']
})
export class PostsGridComponent implements OnInit, AfterViewInit, OnDestroy {
  posts: GridPost[] = [];
  isLoading = false;
  private postsSubscription: Subscription;

  displayedColumns: string[] = ['date', 'title', 'content'];
  dataSource = new MatTableDataSource<GridPost>();

  columns: any[];
  visibleColumns;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostsUpdateListener()
      .pipe(
        map((posts) => {
          return posts.map(post => {
            return {
              _id: post._id,
              date: post.createdAt,
              title: post.title,
              content: post.content
            };
          });
        })
      )
      .subscribe((posts: GridPost[]) => {
        this.isLoading = false;
        this.posts = [...posts];
        this.dataSource.data = this.posts;
      });


      this.columns = [
        { name: 'Date', property: 'date', visible: true },
        { name: 'Title', property: 'title', visible: true, isModelProperty: true },
        { name: 'Content', property: 'content', visible: true, isModelProperty: true },
      ] as any[];

      this.visibleColumns = this.columns.filter(column => column.visible).map(column => column.property);
  }

  testFromARow(_id) {
    const postPage = '/post/' + _id;
    this.router.navigate([postPage]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }


  toggleColumnVisibility(column, event) {
    console.log('column: ', column);
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
}
export interface GridPost {
  _id: string;
  title: string;
  content: string;
  date: string;
}
