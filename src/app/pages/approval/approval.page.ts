import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
  standalone: false,
})
export class ApprovalPage implements OnInit {
  approvals: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Ambil data dari API
    this.fetchNotificationsFromApi();
  }

  fetchNotificationsFromApi() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Tambah Authorization kalau perlu
      // 'Authorization': `Bearer ${your_token}`
    });

    this.http
      .get<{ data: any[] }>(`${this.apiUrl}/pr/pending_approval_ajax`, {
        headers,
      })
      .pipe(
        map((res) => res.data || []),
        tap((data) => {
          this.approvals = data;
          localStorage.setItem('notifications', JSON.stringify(data));
        })
      )
      .subscribe();
  }

  goToDetail(approval: any) {
    this.router.navigate(['/approval-detail'], {
      state: { data: approval },
    });
  }
}
