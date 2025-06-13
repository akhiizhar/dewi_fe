import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: false,
})
export class NotificationsPage implements OnInit {
  notifications: any[] = [];
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Tampilkan data dari localStorage dulu
    this.notifications = this.notificationService.getNotifications();

    // Lalu ambil fresh dari API
    this.notificationService.fetchNotifications().subscribe(() => {
      this.notifications = this.notificationService.getNotifications();
    });
  }

  goBack() {
    window.history.back();
  }
}
