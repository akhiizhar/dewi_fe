import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailHomePageRoutingModule } from './detail-home-routing.module';

import { DetailHomePage } from './detail-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailHomePageRoutingModule
  ],
  declarations: [DetailHomePage]
})
export class DetailHomePageModule {}
