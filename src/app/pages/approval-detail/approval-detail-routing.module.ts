import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalDetailPage } from './approval-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalDetailPageRoutingModule {}
