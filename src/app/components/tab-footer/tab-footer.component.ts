import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-footer',
  templateUrl: './tab-footer.component.html',
  styleUrls: ['./tab-footer.component.scss'],
  standalone: false,
})
export class TabFooterComponent implements OnInit {
  @Input() activeTab = 'home';
  constructor() {}

  ngOnInit() {}
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
