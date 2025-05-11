import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePagePageRoutingModule } from './home-page-routing.module';
import { HomePagePage } from './home-page.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    // SharedModule,
  ],
  declarations: [HomePagePage],
})
export class HomePagePageModule {}
