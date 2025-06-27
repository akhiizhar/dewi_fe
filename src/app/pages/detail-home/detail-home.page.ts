import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-home',
  templateUrl: './detail-home.page.html',
  styleUrls: ['./detail-home.page.scss'],
  standalone: false,
})
export class DetailHomePage implements OnInit {
  item: any;

  steps = [
    { label: 'Create', icon: 'create-outline' },
    { label: 'Manager', icon: 'person-outline' },
    { label: 'Purchasing', icon: 'cart-outline' },
    { label: 'Tender', icon: 'pricetags-outline' },
    { label: 'Finish', icon: 'checkmark-done-outline' },
  ];

  activeStep: number = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['data']) {
      this.item = nav.extras.state['data'];
      this.setActiveStep(this.item);
    }
  }

  goBack() {
    window.history.back();
  }

  setActiveStep(item: any) {
    if (item.status === 'waiting_approval') {
      this.activeStep = 0;
    } else if (item.status === 'approved_manager') {
      this.activeStep = 1;
    } else if (item.status === 'rejected_manager') {
      this.activeStep = 0;
    } else if (item.status === 'approved_purchasing') {
      this.activeStep = 2;
    } else if (item.status === 'rejected_purchasing') {
      this.activeStep = 1;
    } else if (item.status === 'in_tender') {
      this.activeStep = 3;
    } else if (item.status === 'finish') {
      this.activeStep = 4;
    }
  }

  ngOnInit() {}
}
