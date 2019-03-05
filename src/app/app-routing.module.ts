import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostPreviewComponent } from './posts/post-preview/post-preview.component';

import { PostsGridComponent } from './posts/posts-grid/posts-grid.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { WidgetsListComponent } from './dashboard/widgets-list/widgets-list.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { GridComponent } from './grid/grid.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsListComponent, canActivate: [AuthGuard] },
  // { path: 'create', component: PostCreateDialogComponent, canActivate: [AuthGuard] },
  // { path: 'edit/:postId', component: PostCreateDialogComponent, canActivate: [AuthGuard] },
  { path: 'post/:postId', component: PostPreviewComponent, canActivate: [AuthGuard] },

  // { path: 'posts-grid', component: PostsGridComponent, canActivate: [AuthGuard] },
  { path: 'grid', component: GridComponent, canActivate: [AuthGuard] },

  { path: 'dashboard', component: WidgetsListComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
