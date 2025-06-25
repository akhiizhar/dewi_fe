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

  statusCards: { title: string; value: number; icon: string; key: string }[] =
    [];
  activeStatus: string = 'total';
  filteredData: any[] = [];
  rawData: any = {};

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
        this.rawData = response;

        this.statusCards = [
          {
            title: 'Total',
            value: response.total_data,
            icon: 'layers',
            key: 'total',
          },
          {
            title: 'Done',
            value: response.done_count,
            icon: 'checkmark-done',
            key: 'done',
          },
          {
            title: 'Progress',
            value: response.in_progress_count,
            icon: 'time',
            key: 'progress',
          },
          {
            title: 'Tender',
            value: response.in_tender_count,
            icon: 'pricetag',
            key: 'tender',
          },
          {
            title: 'Rejected',
            value: response.rejected_count,
            icon: 'close-circle',
            key: 'rejected',
          },
        ];

        this.setActiveStatus('total');
      },
      error: (err) => {
        console.error('Failed to fetch:', err);
      },
    });
  }

  setActiveStatus(status: string) {
    this.activeStatus = status;

    switch (status) {
      case 'done':
        this.filteredData = this.rawData.done_data || [];
        break;
      case 'progress':
        this.filteredData = this.rawData.in_progress_data || [];
        break;
      case 'tender':
        this.filteredData = this.rawData.in_tender_data || [];
        break;
      case 'rejected':
        this.filteredData = this.rawData.rejected_data || [];
        break;
      case 'total':
      default:
        this.filteredData = [
          ...(this.rawData.done_data || []),
          ...(this.rawData.in_progress_data || []),
          ...(this.rawData.in_tender_data || []),
          ...(this.rawData.rejected_data || []),
        ];
        break;
    }
  }

  onStatusCardClick(key: string) {
    this.setActiveStatus(key);
  }

  openFilter() {
    this.router.navigate(['/notifications']);
    this.notificationService.markAsSeen();
    this.notificationCount = 0;
  }

  viewAllPending() {
    this.router.navigate(['/pr-list'], {
      queryParams: { filter: 'waiting_approval' },
    });
  }
}
