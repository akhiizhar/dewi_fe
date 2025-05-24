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

  ngOnInit() {}

  logout() {
    console.log('User logged out');
    localStorage.clear();
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
