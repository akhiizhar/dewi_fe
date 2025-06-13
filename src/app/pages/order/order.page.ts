import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage implements OnInit {
  orderForm: FormGroup;
  apiUrl = environment.apiUrl;
  token: string | null = null;

  showDatePicker: boolean = false;
  // @ViewChild('datePicker') datePicker!: IonDatetime;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.orderForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });
  }

  ngOnInit() {
    // ini untuk ambil data user
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.token = userObj.access_token || null;
    } else {
      this.token = null;
    }
    console.log('Token:', this.token);
  }

  // ini untuk amvil array nya
  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      item_name: ['', Validators.required],
      specification: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      unit_price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  submitForm(): void {
    const formValue = this.orderForm.value;

    if (!this.token) {
      alert('Token tidak ditemukan. Silakan login ulang.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };

    this.http
      .post(`${this.apiUrl}/pr/store`, formValue, { headers })
      .subscribe({
        next: (res) => {
          console.log('Success:', res);
          alert('Order berhasil dikirim!');
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Gagal mengirim order.');
        },
      });
  }
  updateDueDate(event: any) {
    const selectedDate = event.detail.value;
    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
    this.orderForm.get('due_date')?.setValue(formattedDate);
    this.showDatePicker = false; // sembunyikan lagi
  }
}
