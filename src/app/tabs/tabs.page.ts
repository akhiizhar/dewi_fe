import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {
  @Input() activeTab = 'home-page';
  userRole: string = ''; // misalnya: 'user' atau 'admin'
  constructor() {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    console.log('User string from localStorage:', userString);
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        this.userRole = parsedUser.user?.roles?.[0] || ''; // Ambil role pertama
        console.log('Parsed user role:', this.userRole);
      } catch (error) {
        console.error('Error parsing user role:', error);
        this.userRole = '';
      }
    } else {
      this.userRole = '';
    }
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
