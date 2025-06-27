import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ToastController, LoadingController } from '@ionic/angular';

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
  searchTerm: string = '';
  searchSubject = new Subject<string>();

  statusCards: { title: string; value: number; icon: string; key: string }[] =
    [];
  activeStatus: string = 'total';
  filteredData: any[] = [];
  rawData: any = {};

  loading: HTMLIonLoadingElement | null = null;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private http: HttpClient,
    private toastController: ToastController,
    private loadingController: LoadingController
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

    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        if (term.length >= 5) {
          this.filterLocal(term);
        } else {
          this.setActiveStatus(this.activeStatus); // Gunakan status terakhir
        }
      });
  }

  async fetchStatusCount() {
    await this.presentLoading();

    this.http.get<any>(`${this.apiUrl}/status_count`).subscribe({
      next: async (response) => {
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

        this.setActiveStatus(this.activeStatus);
        await this.dismissLoading();
      },
      error: async (err) => {
        console.error('Failed to fetch:', err);
        await this.dismissLoading();
      },
    });
  }

  onSearchInput(event: any) {
    const value = event.detail.value.trim().toLowerCase();
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  filterLocal(term: string) {
    const allData = [
      ...(this.rawData.done_data || []),
      ...(this.rawData.in_progress_data || []),
      ...(this.rawData.in_tender_data || []),
      ...(this.rawData.rejected_data || []),
    ];

    this.filteredData = allData.filter(
      (item) =>
        item.title?.toLowerCase().includes(term) ||
        item.no_reg?.toLowerCase().includes(term) ||
        item.status?.toLowerCase().includes(term)
    );
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved_manager':
        return 'status-approved';
      case 'rejected_manager':
      case 'rejected_purchasing':
        return 'status-rejected';
      case 'in_tender':
        return 'status-in-tender';
      case 'finish':
        return 'status-finished';
      default:
        return '';
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

  async handleRefresh(event: any) {
    await this.notificationService.fetchNotifications().toPromise();
    this.notificationService.resetSeenStatusIfNewNotifications();
    this.notificationCount = this.notificationService.getNotificationCount();

    await this.fetchStatusCount(); // fetchStatusCount() sudah punya loading

    setTimeout(() => {
      event.target.complete();
      this.presentToast();
    }, 500);
  }

  // === Loading ===
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Memuat data...',
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  // === Toast ===
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Data berhasil diperbarui',
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }
  onCardClick(item: any) {
    this.router.navigate(['/detail-home'], {
      state: { data: item },
    });
  }
}
