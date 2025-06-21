import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {
  apiUrl = environment.apiUrl;
  data: any[] = [];
  selectedItem: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get<any>(`${this.apiUrl}/pr/history_approval_ajax`).subscribe({
      next: (res) => {
        this.data = res.data || [];
      },
      error: (err) => {
        console.error('Error fetching history:', err);
      },
    });
  }

  openDetail(item: any) {
    this.selectedItem = item;
  }

  closeModal() {
    this.selectedItem = null;
  }
  getStatusClass(status: string): string {
    if (status === 'approved_manager') return 'status-approved';
    if (status === 'in_tender') return 'status-in-tender';
    return 'status-rejected';
  }
  getStepValue(status: string): number {
    switch (status) {
      case 'approved_manager':
        return 2;
      case 'in_tender':
        return 3;
      case 'finished':
        return 4;
      default:
        return 1;
    }
  }

  isAtLeastStep(step: number): boolean {
    return this.getStepValue(this.selectedItem?.status) >= step;
  }

  isFinalStep(): boolean {
    return this.selectedItem?.status === 'finished';
  }
}
