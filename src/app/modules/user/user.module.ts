import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { InfoPage } from './info/info.page';
import { BindPage } from './bind/bind.page';

const routes: Routes = [
  { path: '', component: UserPage },
  { path: 'info', component: InfoPage },
  { path: 'bind', component: BindPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserPage,
    InfoPage,
    BindPage
  ]
})
export class UserPageModule { }
