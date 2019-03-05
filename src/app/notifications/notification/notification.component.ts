import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notificationData: any;
  @Output() deleteNotification = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

  onDeleteNotification(id) {
    this.deleteNotification.emit(id);
  }
}
