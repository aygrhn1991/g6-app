import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPage } from './tabs.page';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { BindGuard } from 'src/app/guards/bind.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      //{ path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule), canActivate: [BindGuard], },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      { path: 'location', loadChildren: () => import('../location/location.module').then(m => m.LocationPageModule) },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserPageModule) }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
