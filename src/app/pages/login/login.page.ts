import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  ngOnInit() {}
  showPassword = false;
  loginForm: FormGroup;
  loginErrorMessage: string | null = null;
  isLoading = false;
  apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }
  async presentSuccessAlert(name: string) {
    const alert = await this.alertController.create({
      header: 'Login Berhasil',
      message: `Selamat datang ${name}!`,
      buttons: ['OK'],
    });
    await alert.present();

    // Tunggu sampai user menekan OK, baru redirect
    await alert.onDidDismiss();
    window.location.href = '/tabs';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const formData = this.loginForm.value;
    console.log('Form submitted', formData);

    this.http.post(`${this.apiUrl}/login`, formData).subscribe({
      next: async (response: any) => {
        console.log('Login successful', response);
        // Simpan token ke localStorage
        const data = response;
        localStorage.setItem('user', JSON.stringify(data));
        this.loginErrorMessage = null;
        this.isLoading = false;
        // Ambil data user dari localStorage
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('Stored user data:', storedUser);

        // Ambil nama atau data lain dari storedUser
        const name = storedUser.user.name; // Misalnya mengambil nama dari objek yang disimpan
        await this.presentSuccessAlert(name); // Tampilkan nama melalui alert
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginErrorMessage = 'Login gagal. Cek email atau password kamu.';
        this.isLoading = false;
      },
    });
  }
}
