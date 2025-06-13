import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: any[] = [
    {
      title: 'Quality Review',
      description:
        'Please review the quality inspection result and provide your feedback.',
      date: new Date('2025-06-13T14:00:00'),
      message: 'Need Approval',
    },
    {
      title: 'Component Verification',
      description:
        'Check the new component batch for compliance with standards.',
      date: new Date('2025-06-12T09:30:00'),
      message: 'Need Approval',
    },
    {
      title: 'Inspection Result Dispute',
      description:
        'There is a discrepancy in the recent inspection that needs your attention.',
      date: new Date('2025-06-11T16:45:00'),
      message: 'Need Approval',
    },
    {
      title: 'Process Deviation',
      description:
        'A deviation from the standard operating procedure has been logged.',
      date: new Date('2025-06-10T10:15:00'),
      message: 'Need Approval',
    },
    {
      title: 'Audit Findings',
      description: 'New findings from the internal audit require your review.',
      date: new Date('2025-06-09T13:20:00'),
      message: 'Need Approval',
    },
    {
      title: 'Calibration Alert',
      description:
        'Measurement equipment needs re-calibration based on recent usage.',
      date: new Date('2025-06-08T08:00:00'),
      message: 'Need Approval',
    },
    {
      title: 'Supplier Report',
      description: 'A new report from supplier A56 requires validation.',
      date: new Date('2025-06-07T15:40:00'),
      message: 'Need Approval',
    },
  ];

  constructor(private http: HttpClient) {}

  // ⛔ Nanti pakai ini kalau API sudah tersedia
  /*
  fetchNotifications(): Observable<any[]> {
    return this.http.get<any[]>('https://api.example.com/notifications').pipe(
      tap((data) => {
        this.notifications = data;
        localStorage.setItem('notifications', JSON.stringify(data));
      })
    );
  }
  */

  // ✅ Sementara pakai hardcoded
  fetchNotifications(): Observable<any[]> {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
    return of(this.notifications);
  }

  getNotifications(): any[] {
    const local = localStorage.getItem('notifications');
    return local ? JSON.parse(local) : [];
  }

  getNotificationCount(): number {
    return this.getNotifications().length;
  }
}
