import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  showPassword = false;
  loginForm: FormGroup;
  loginErrorMessage: string | null = null;
  isLoading = false;
  apiUrl = environment.apiUrl;
  showSuccessModal = false;
  userName = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }
  ngOnInit() {}
  async presentSuccessModal(name: string) {
    this.userName = name;
    this.showSuccessModal = true;
  }

  closeModal() {
    this.showSuccessModal = false;
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
    // console.log('Form submitted', formData);
    this.http.post(`${this.apiUrl}/login`, formData).subscribe({
      next: async (response: any) => {
        const data = response;
        // localStorage.setItem('user', JSON.stringify(data));
        // this.loginErrorMessage = null;
        // this.isLoading = false;
        // const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        // console.log('Stored user data:', storedUser);
        // const name = storedUser.user.name;
        // await this.presentSuccessModal(name);
        // Simpan token dan user secara terpisah
        const token = response.access_token;
        const tokenType = response.token_type || 'Bearer';
        // const user = response.user;

        localStorage.setItem('token', token);
        localStorage.setItem('token_type', tokenType);
        localStorage.setItem('user', JSON.stringify(data));

        this.loginErrorMessage = null;
        this.isLoading = false;

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const name = storedUser.user.name; // karena sudah simpan user langsung
        await this.presentSuccessModal(name);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginErrorMessage = 'Login gagal. Cek email atau password kamu.';
        this.isLoading = false;
      },
    });
  }
}
