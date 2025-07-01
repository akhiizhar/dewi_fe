import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(
    private router: Router,
    private http: HttpClient // ✅ Tambahkan HttpClient
  ) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.user = userObj.user;
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    if (!this.user?.email) {
      console.error('Email not found, cannot logout via API.');
      return;
    }

    const body = { email: this.user.email };

    this.http.post('/api/logout', body).subscribe({
      next: (res) => {
        console.log('Logout success', res);
        localStorage.clear();

        // ✅ Navigasi ke login & clear history stack
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      error: (err) => {
        console.error('Logout failed', err);
        // Tetap logout secara lokal meskipun gagal API
        localStorage.clear();
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
    });
  }
}
