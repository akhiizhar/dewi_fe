import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  standalone: false,
})
export class HomePagePage implements OnInit {
  name: string = '';
  todayDate: string = '';
  constructor() {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      // console.log('Parsed user:', parsedUser);
      this.name = parsedUser?.user.name || '';
    }
    //  Format hari & tanggal
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    this.todayDate = today.toLocaleDateString('id-ID', options);
  }

  openFilter() {
    console.log('Filter opened');
    // Implement filter logic here
  }
}
