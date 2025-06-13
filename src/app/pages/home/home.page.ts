import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}
  // constructor(private navCtrl: NavController) {}

  ngOnInit() {}
  // Function to be called when the button is clicked
  goToLogin() {
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }
  // setTimeout(() => {
  //   this.navCtrl.navigateRoot('/login'); // Ganti '/login' sesuai rute halaman login kamu
  // }, 3000); // 3 detik
  // }
}
