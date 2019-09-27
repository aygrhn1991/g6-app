import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../../guards/auth.guard';
import { BindGuard } from 'src/app/guards/bind.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule), canActivate: [BindGuard], },
      { path: 'location', loadChildren: () => import('../location/location.module').then(m => m.LocationPageModule), canActivate: [BindGuard], },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserPageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
