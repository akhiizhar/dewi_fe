import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  constructor(private router: Router) {}

  user: any;

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.user = userObj.user; // Ambil data user dari objek
    }
  }

  logout() {
    console.log('User logged out');
    localStorage.clear();
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
