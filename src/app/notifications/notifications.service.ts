import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notifications = this.socket.fromEvent<any[]>('notifications');
  notificationsList: any[] = [];
  notificationsListUpdated = new Subject<any[]>();

  constructor(private socket: Socket) { }

  getNotificationsUpdateListener() {
    return this.notificationsListUpdated.asObservable();
  }

  getNotifications() {
    this.socket.emit('getNotification');

    this.notifications.subscribe(
      (notificationItem) => {
        this.notificationsList.unshift(notificationItem);
        this.notificationsListUpdated.next([...this.notificationsList]);
      }
    );
  }

  getNotificationsList() {
    return this.notificationsList;
  }

  deleteNotification(id) {
    const selectedNotificationIndex = this.notificationsList.findIndex((item) =>  +item.id === id );
    this.notificationsList.splice(selectedNotificationIndex, 1);
    this.notificationsListUpdated.next([...this.notificationsList]);
  }

  onDeleteAllNotifications() {
    this.notificationsList = [];
    this.notificationsListUpdated.next([...this.notificationsList]);
  }
}
