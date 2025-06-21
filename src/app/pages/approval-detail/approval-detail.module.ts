import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovalDetailPageRoutingModule } from './approval-detail-routing.module';

import { ApprovalDetailPage } from './approval-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovalDetailPageRoutingModule
  ],
  declarations: [ApprovalDetailPage]
})
export class ApprovalDetailPageModule {}
