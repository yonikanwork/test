import { Component, OnInit,  OnDestroy } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Subscription } from 'rxjs';
import { Notification } from './notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy  {
  notificationsList: Notification[] = [];
  private notificationsListSubscription: Subscription;

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notificationsList = this.notificationsService.getNotificationsList();
    // console.log('this.notificationsList: ', this.notificationsList);
    // this.notificationsService.getNotifications();
    this.notificationsListSubscription = this.notificationsService.getNotificationsUpdateListener()
      .subscribe((notifications) => {
        // console.log('notifications: ', notifications);
        this.notificationsList = notifications;
      });
  }


  onDeleteNotification(id: number) {
    this.notificationsService.deleteNotification(id);
  }

  onDeleteAllNotifications() {
    this.notificationsService.onDeleteAllNotifications();
  }

  ngOnDestroy() {
    this.notificationsListSubscription.unsubscribe();
  }
}
