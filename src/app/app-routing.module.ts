import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'home', // Redirect to home page if no path is provided
//     pathMatch: 'full',
//   },
//   {
//     path: 'home',
//     loadChildren: () =>
//       import('./pages/home/home.module').then((m) => m.HomePageModule),
//   },
//   {
//     path: 'home-page',
//     loadChildren: () =>
//       import('./pages/home-page/home-page.module').then(
//         (m) => m.HomePagePageModule
//       ),
//   },
// {
//   path: 'login',
//   loadChildren: () =>
//     import('./pages/login/login.module').then((m) => m.LoginPageModule),
// },
//   {
//     path: 'order',
//     loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
//   },
//   {
//     path: 'search',
//     loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
//   },
//   {
//     path: 'history',
//     loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
//   },
//   {
//     path: 'profile',
//     loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
//   },
//   {
//     path: 'tabs',
//     loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
//   },
//   // {
// ];

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
