import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

// import { Post } from './post.model';
import { environment } from '../../environments/environment';
import { UIService } from '../shared/ui.service';
import { Post } from './post.model';
const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router, private uiService: UIService) {}

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    return this.http.get<Post[]>(BACKEND_URL).subscribe((fetchedPosts: any) => {
      this.posts = fetchedPosts.posts.reverse(); // reverse the posts order
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return this.http.get<Post>(BACKEND_URL + '/' + id);
  }

  creatPost(title, content) {
    const postData = {
      title: title,
      content: content,
      imagePath: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    };

    this.http.post<any>(BACKEND_URL, postData)
      .subscribe(
        response => {
          this.router.navigateByUrl('/home', {skipLocationChange: true}) // hack to refresh the posts-list component after adding a post.
            .then(() => {
              this.router.navigate(['/posts']);
              this.uiService.showSnackbar('Post has been created!', null, 2000);
            });
        },
        error => {
          console.log('error: ', error);
        }
      );
  }

  updatePost(_id: string, title: string, content: string) {
    const post: any = {
      _id: _id,
      title: title,
      content: content,
      imagePath: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    };

    this.http.put(BACKEND_URL + _id, post).subscribe(response => {
      this.router.navigateByUrl('/home', {skipLocationChange: true}) // hack to refresh the posts-list component after adding a post.
        .then(() => {
          this.router.navigate(['/posts']);
          this.uiService.showSnackbar('Post has been updated!', null, 2000);
        });

      // const updatedPosts = [...this.posts];
      // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      // updatedPosts[oldPostIndex] = post;
      // this.posts = updatedPosts;
      // this.postsUpdated.next([...this.posts]);
      // this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string) {
    this.http.delete(BACKEND_URL + postId).subscribe(response => {
      this.router.navigateByUrl('/home', {skipLocationChange: true}) // hack to refresh the posts-list component after adding a post.
        .then(() => {
          this.router.navigate(['/posts']);
          this.uiService.showSnackbar('Post has been deleted!', null, 2000);
        });

      // const updatedPosts = this.posts.filter(post => post.id !== postId);
      // this.posts = updatedPosts;
      // this.postsUpdated.next([...this.posts]);
    });
  }
}
