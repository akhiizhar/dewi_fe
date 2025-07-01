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
    const oldNotifications = this.notificationService.getNotifications();

    this.notificationService
      .fetchNotifications()
      .subscribe((freshNotifications: any[]) => {
        const updatedNotifications = freshNotifications.map((newNotif) => {
          const oldNotif = oldNotifications.find((o) => o.id === newNotif.id);

          if (!oldNotif) {
            return { ...newNotif, isNew: true };
          }

          if (oldNotif.status !== newNotif.status) {
            return { ...newNotif, isNew: true };
          }

          return { ...newNotif, isNew: false };
        });

        this.notifications = updatedNotifications;
        this.notificationService.saveNotifications(updatedNotifications);
      });

    this.notifications = oldNotifications;
  }

  goBack() {
    window.history.back();
  }

  get newCount(): number {
    return this.notifications.filter((n) => n.isNew).length;
  }
}
