import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { RouterGuard } from '../login/router.guard';

const routes: Routes = [
  { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [RouterGuard],
    children: [
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
      { path: 'location', children: [{ path: '', loadChildren: () => import('../location/location.module').then(m => m.LocationPageModule) }] },
      { path: 'home', children: [{ path: '', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) }] },
      { path: 'user', children: [{ path: '', loadChildren: () => import('../user/user.module').then(m => m.UserPageModule) }] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
