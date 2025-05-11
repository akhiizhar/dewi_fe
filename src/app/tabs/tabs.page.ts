import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {
  @Input() activeTab = 'home-page';
  constructor() {}

  ngOnInit() {}
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
