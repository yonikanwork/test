import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationsService } from '../notifications/notifications.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();

  isAuthenticated = false;
  private authStatusSub: Subscription;

  notificationsList: Notification[] = [];
  private notificationsListSubscription: Subscription;

  constructor(public authService: AuthService, private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });

    this.notificationsList = this.notificationsService.getNotificationsList();
    this.notificationsListSubscription = this.notificationsService.getNotificationsUpdateListener()
      .subscribe((notifications) => {
        this.notificationsList = notifications;
      });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
