import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  standalone: false,
})
export class HomePagePage implements OnInit {
  name: string = '';
  todayDate: string = '';
  notificationCount = 0;
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.name = parsedUser?.user.name || '';
    }
    //  Format hari & tanggal
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    this.todayDate = today.toLocaleDateString('id-ID', options);

    this.notificationCount = this.notificationService.getNotificationCount();

    // Lalu fetch dari API & update count
    this.notificationService.fetchNotifications().subscribe(() => {
      this.notificationService.resetSeenStatusIfNewNotifications();
      this.notificationCount = this.notificationService.getNotificationCount();
    });
  }

  openFilter() {
    console.log('Navigating to notifications...');
    this.router.navigate(['/notifications']);
    this.notificationService.markAsSeen(); // ✅ tandai sudah dilihat
    this.notificationCount = 0; // ✅ perbarui badge
  }
}
