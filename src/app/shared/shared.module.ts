import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabFooterComponent } from '../components/tab-footer/tab-footer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TabFooterComponent],
  imports: [CommonModule, IonicModule],
  exports: [TabFooterComponent],
})
export class SharedModule {}
