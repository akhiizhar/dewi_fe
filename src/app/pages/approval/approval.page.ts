import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
  standalone: false,
})
export class ApprovalPage implements OnInit {
  approvals: any[] = [];

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    // Ambil data dari localStorage dulu
    this.approvals = this.notificationService.getNotifications();

    // Lalu ambil data terbaru dari API
    this.notificationService.fetchNotifications().subscribe(() => {
      this.approvals = this.notificationService.getNotifications();
    });
  }
  goToDetail(approval: any) {
    this.router.navigate(['/approval-detail'], {
      state: { data: approval },
    });
  }
}
