import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule), // ini adalah halaman login
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'approval-detail',
    loadChildren: () => import('./pages/approval-detail/approval-detail.module').then( m => m.ApprovalDetailPageModule)
  },  {
    path: 'detail-home',
    loadChildren: () => import('./pages/detail-home/detail-home.module').then( m => m.DetailHomePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
