import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { fileSizeValidator } from 'src/app/validators/file-size.validator';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage implements OnInit {
  orderForm: FormGroup;
  apiUrl: string = environment.apiUrl;
  showDatePicker: boolean = false;
  isSubmitting: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  showModalPopup: boolean = false;
  isSuccessModal: boolean = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private platform: Platform
  ) {
    this.orderForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });
  }

  ngOnInit() {
    // Deteksi keyboard muncul/hilang
    this.platform.ready().then(() => {
      if (window) {
        window.addEventListener('keyboardDidShow', () => {
          document.body.classList.add('keyboard-is-open');
        });
        window.addEventListener('keyboardDidHide', () => {
          document.body.classList.remove('keyboard-is-open');
        });
      }
    });
  }

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
      file: [null, [fileSizeValidator(5 * 1024 * 1024)]],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  submitForm(): void {
    if (this.orderForm.invalid) {
      alert('Form tidak valid!');
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('title', this.orderForm.get('title')?.value);
    formData.append('description', this.orderForm.get('description')?.value);
    formData.append('due_date', this.orderForm.get('due_date')?.value);

    const items = this.orderForm.get('items')?.value;
    items.forEach((item: any, index: number) => {
      formData.append(`items[${index}][item_name]`, item.item_name);
      formData.append(`items[${index}][specification]`, item.specification);
      formData.append(`items[${index}][quantity]`, item.quantity);
      formData.append(`items[${index}][unit]`, item.unit);
      formData.append(`items[${index}][unit_price]`, item.unit_price);
      if (item.file) {
        formData.append(`items[${index}][file]`, item.file);
      }
    });

    this.http.post(`${this.apiUrl}/pr/store`, formData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.showModal('Success', 'Order berhasil dikirim!', true);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.showModal('Error', 'Gagal mengirim order.', false);
      },
    });
  }

  updateDueDate(event: any) {
    const formattedDate = new Date(event.detail.value).toLocaleDateString(
      'en-CA'
    );
    this.orderForm.get('due_date')?.setValue(formattedDate);
    this.showDatePicker = false;
  }

  minDate(): string {
    return new Date().toLocaleDateString('en-CA');
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('Ukuran file melebihi 5MB!');
        return;
      }
      this.items.at(index).get('file')?.setValue(file);
    }
  }

  showModal(title: string, message: string, success: boolean = true) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.isSuccessModal = success;
    this.showModalPopup = true;
  }

  closeModal() {
    this.showModalPopup = false;
    this.orderForm.reset();
    this.items.clear();
    this.items.push(this.createItem());
    window.location.href = '/tabs';
  }
}
