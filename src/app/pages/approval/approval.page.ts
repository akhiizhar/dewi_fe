import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
  standalone: false,
})
export class ApprovalPage implements OnInit {
  approvals: any[] = [];
  apiUrl = environment.apiUrl;
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchNotificationsFromApi();
  }

  fetchNotificationsFromApi() {
    this.loading = true;

    this.http
      .get<{ data: any[] }>(`${this.apiUrl}/pr/pending_approval_ajax`)
      .pipe(
        map((res) => res.data || []),
        tap((data) => {
          this.approvals = data;
          localStorage.setItem('notifications', JSON.stringify(data));
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        error: (err) => {
          console.error('Failed to fetch approvals:', err);
        },
      });
  }

  goToDetail(approval: any) {
    this.router.navigate(['/approval-detail'], {
      state: { data: approval },
    });
  }
}
