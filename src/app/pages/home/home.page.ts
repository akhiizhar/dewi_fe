import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  // Function to be called when the button is clicked
  goToLogin() {
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }
}
