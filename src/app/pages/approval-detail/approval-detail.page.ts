import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approval-detail',
  templateUrl: './approval-detail.page.html',
  styleUrls: ['./approval-detail.page.scss'],
  standalone: false,
})
export class ApprovalDetailPage implements OnInit {
  approval: any;
  note: string = '';
  apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    this.approval = navigation?.extras?.state?.['data'];
  }

  goBack() {
    window.history.back();
  }
  submitApproval(status: 'approved_manager' | 'rejected_manager') {
    const body = {
      uuid: this.approval.uuid,
      status,
      note: this.note,
    };
    console.log('Body yang dikirim:', body);

    this.http.post(`${this.apiUrl}/pr/approval`, body).subscribe({
      next: (res) => {
        console.log(`Approval ${status} success`, res);
        // Misal redirect atau modal di sini
        window.location.href = '/tabs/approval';
      },
      error: (err) => {
        console.error(`Approval ${status} error`, err);
      },
    });
  }

  ngOnInit() {}
}
