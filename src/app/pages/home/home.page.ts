import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  countData: any = {};
  apiUrl = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchCountData();
  }

  fetchCountData() {
    this.http.get<any>(`${this.apiUrl}/status_count`).subscribe(
      (response) => {
        console.log('Count data fetched:', response);
        this.countData = response;
        // Handle the count data as needed
      },
      (error) => {
        console.error('Error fetching count data:', error);
      }
    );
  }
  goToLogin() {
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }
}
