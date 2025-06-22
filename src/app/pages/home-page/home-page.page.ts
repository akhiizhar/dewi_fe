import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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
  apiUrl = environment.apiUrl;

  statusCards: { title: string; value: number; icon: string }[] = [];
  pendingApprovals = [
    {
      requester: 'Andi Saputra',
      itemName: 'Laptop Dell XPS',
      date: '20 Jun 2025',
    },
    {
      requester: 'Budi Santoso',
      itemName: 'Printer Epson',
      date: '21 Jun 2025',
    },
  ];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.name = parsedUser?.user.name || '';
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    this.todayDate = today.toLocaleDateString('id-ID', options);

    this.notificationCount = this.notificationService.getNotificationCount();

    this.notificationService.fetchNotifications().subscribe(() => {
      this.notificationService.resetSeenStatusIfNewNotifications();
      this.notificationCount = this.notificationService.getNotificationCount();
    });

    this.fetchStatusCount();
  }

  fetchStatusCount() {
    this.http.get<any>(`${this.apiUrl}/status_count`).subscribe({
      next: (response) => {
        console.log('Status count fetched:', response);

        this.statusCards = [
          { title: 'Total', value: response.total_data, icon: 'layers' },
          { title: 'Done', value: response.done, icon: 'checkmark-done' },
          { title: 'In Progress', value: response.in_progress, icon: 'time' },
          { title: 'In Tender', value: response.in_tender, icon: 'pricetag' },
          { title: 'Rejected', value: response.rejected, icon: 'close-circle' },
        ];
      },
      error: (error) => {
        console.error('Failed to fetch status count:', error);
        this.statusCards = [];
      },
    });
  }

  openFilter() {
    this.router.navigate(['/notifications']);
    this.notificationService.markAsSeen();
    this.notificationCount = 0;
  }
}
