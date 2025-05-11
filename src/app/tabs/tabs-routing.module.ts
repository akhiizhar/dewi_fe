import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home-page',
        loadChildren: () =>
          import('../pages/home-page/home-page.module').then(
            (m) => m.HomePagePageModule
          ),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('../pages/order/order.module').then((m) => m.OrderPageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../pages/search/search.module').then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('../pages/history/history.module').then(
            (m) => m.HistoryPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
