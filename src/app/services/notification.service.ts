import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // private notifications: any[] = [];
  private hasSeenNotifications = false;
  notifications: any[] = [];
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // ⛔ Nanti pakai ini kalau API sudah tersedia
  fetchNotifications(): Observable<any[]> {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Stored user data:', storedUser);
    const token = storedUser?.access_token;

    if (!token) {
      console.error('Token tidak ditemukan!');
      return of([]); // Kembalikan Observable kosong jika token tidak ada
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http
      .get<{ data: any[] }>(`${this.apiUrl}/pr/pending_approval_ajax`, {
        headers,
      })
      .pipe(
        map((response) => response.data || []), // ambil langsung array-nya
        tap((data) => {
          this.notifications = data;
          localStorage.setItem('notifications', JSON.stringify(data));
        })
      );
  }

  getNotifications(): any[] {
    const local = localStorage.getItem('notifications');
    return local ? JSON.parse(local) : [];
  }

  getNotificationCount(): number {
    return this.getNotifications().length;
    // return this.getNotifications().length;
  }

  markAsSeen() {
    this.hasSeenNotifications = true;
  }
  resetSeenStatusIfNewNotifications() {
    if (this.getNotificationCount() > 0 && !this.hasSeenNotifications) {
      this.hasSeenNotifications = false; // Reset status jika ada notifikasi baru
    }
  }

  saveNotifications(notifs: any[]): void {
    localStorage.setItem('notifications', JSON.stringify(notifs));
  }
}
