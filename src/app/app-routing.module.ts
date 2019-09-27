import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginPageModule) },
  { path: 'test', loadChildren: () => import('./modules/test/test.module').then(m => m.TestPageModule) },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
