import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailHomePage } from './detail-home.page';

const routes: Routes = [
  {
    path: '',
    component: DetailHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailHomePageRoutingModule {}
