import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { ChartsModule } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

import { ErrorInterceptor } from './error/error-interceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostComponent } from './posts/posts-list/post/post.component';
import { PostsGridComponent } from './posts/posts-grid/posts-grid.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { PostPreviewComponent } from './posts/post-preview/post-preview.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { WidgetsListComponent } from './dashboard/widgets-list/widgets-list.component';
import { WidgetComponent } from './dashboard/widgets-list/widget/widget.component';
import { PostDeleteDialogComponent } from './posts/post-delete-dialog/post-delete-dialog.component';
import { PostCreateDialogComponent } from './posts/post-create-dialog/post-create-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WidgetBarChartComponent } from './dashboard/widgets-list/widget-bar-chart/widget-bar-chart.component';
import { SearchComponent } from './search/search.component';
import { NotificationComponent } from './notifications/notification/notification.component';
import { ClickOutsideDirective } from './header/click-outside.directive';

import { WidgetLineChartComponent } from './dashboard/widgets-list/widget-line-chart/widget-line-chart.component';
import { WidgetDoughnutChartComponent } from './dashboard/widgets-list/widget-doughnut-chart/widget-doughnut-chart.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ThemePickerComponent } from './settings/theme-picker/theme-picker.component';
import { GridComponent } from './grid/grid.component';
import { QuickpanelComponent } from './quickpanel/quickpanel.component';
import { WidgetLineRealtimeChartComponent } from './dashboard/widgets-list/widget-line-realtime-chart/widget-line-realtime-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsListComponent,
    PostCreateDialogComponent,
    PostComponent,
    PostsGridComponent,
    HomeComponent,
    ErrorComponent,
    PostPreviewComponent,
    SidenavListComponent,
    WidgetsListComponent,
    WidgetComponent,
    PostDeleteDialogComponent,
    SettingsComponent,
    NotificationsComponent,
    WidgetBarChartComponent,
    WidgetLineChartComponent,
    WidgetDoughnutChartComponent,
    SearchComponent,
    NotificationComponent,
    ClickOutsideDirective,
    ThemePickerComponent,
    GridComponent,
    QuickpanelComponent,
    WidgetLineRealtimeChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SocketIoModule.forRoot(config),
    ScrollingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [
    ErrorComponent,
    PostCreateDialogComponent,
    PostDeleteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
