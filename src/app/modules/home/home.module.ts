import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { OnlinelogPage } from './onlinelog/onlinelog.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'onlinelog', component: OnlinelogPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    OnlinelogPage
  ]
})
export class HomePageModule { }
